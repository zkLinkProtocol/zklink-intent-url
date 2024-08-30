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
    const folderPath = path.join(process.cwd(), 'assets/logos');
    if (folderPath) {
      try {
        const urls = await this.filesService.uploadFolder(folderPath);
        this.logger.log('Uploaded files:', urls);
      } catch (error) {
        this.logger.error('Error uploading folder:', error);
      }
    }
  }
}
