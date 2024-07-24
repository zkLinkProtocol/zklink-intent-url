import path from 'path';

import { Module, OnModuleInit } from '@nestjs/common';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule implements OnModuleInit {
  constructor(private readonly filesService: FilesService) {}

  async onModuleInit() {
    const folderPath = path.join(process.cwd(), 'assets/logos');
    if (folderPath) {
      try {
        const urls = await this.filesService.uploadFolder(folderPath);
        console.log('Uploaded files:', urls);
      } catch (error) {
        console.error('Error uploading folder:', error);
      }
    }
  }
}
