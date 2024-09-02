import fs from 'fs/promises';
import path from 'path';

import { Logger, Module, OnModuleInit } from '@nestjs/common';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule implements OnModuleInit {
  logger: Logger;
  constructor(private readonly filesService: FilesService) {
    this.logger = new Logger(FilesModule.name);
  }

  async onModuleInit() {
    const baseFolderPath = path.join(process.cwd(), 'assets');

    try {
      const folders = await fs
        .readdir(baseFolderPath, { withFileTypes: true })
        .then((entries) =>
          entries
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name),
        );

      for (const folder of folders) {
        const folderPath = path.join(baseFolderPath, folder);
        const urls = await this.filesService.uploadFolder(folderPath, folder);
        this.logger.log(`Uploaded ${folder} files:`, urls);
      }
    } catch (error) {
      this.logger.error('Error uploading folders:', error);
    }
  }
}
