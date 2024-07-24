import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { BaseController } from 'src/common/base.controller';
import { CommonApiOperation } from 'src/common/base.decorators';
import { ResponseDto } from 'src/common/response.dto';

import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
export class FilesController extends BaseController {
  constructor(private readonly filesService: FilesService) {
    super();
  }

  @Post('image')
  @CommonApiOperation('Upload image.')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseDto<string>> {
    const result = await this.filesService.uploadMetadata(file);
    return this.success(result);
  }
}
