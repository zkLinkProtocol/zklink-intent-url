import fs from 'fs';
import path from 'path';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import AWS from 'aws-sdk';
import { lookup } from 'mime-types';

import { BusinessException } from 'src/exception/business.exception';

@Injectable()
export class FilesService {
  private logger = new Logger(FilesService.name);
  private readonly s3: AWS.S3;
  private keyPrefix: string;

  constructor() {
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });
    } else {
      this.s3 = new AWS.S3({
        region: process.env.AWS_REGION,
      });
    }
    this.keyPrefix = process.env.AWS_KEY_PREFIX;
  }

  public async uploadImg(file: Express.Multer.File, fileName: string) {
    const mimeType = lookup(fileName);
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
      'image/tiff',
      'image/svg+xml',
      'image/x-icon',
    ];
    if (!mimeType || !allowedTypes.includes(mimeType)) {
      throw new BusinessException(
        'File type must be an image (JPEG, PNG, GIF, BMP, WEBP, TIFF, SVG, ICO).',
      );
    }
    return this.uploadFile(file, fileName);
  }

  public async uploadFile(file: Express.Multer.File, fileName: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${this.keyPrefix}/${fileName}`,
      Body: file.buffer,
    };
    this.logger.log(
      `uploading file Key:${params.Key}, Bucket:${params.Bucket}`,
    );
    const result = await this.s3.upload(params).promise();
    return result.Location;
  }

  public async deleteFile(fileName: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${this.keyPrefix}/${fileName}`,
    };
    this.logger.log(`deleting file Key:${params.Key}, Bucket:${params.Bucket}`);

    const result = await this.s3.deleteObject(params).promise();
    return result.DeleteMarker;
  }

  async uploadFolder(folderPath: string): Promise<string[]> {
    const files = fs.readdirSync(folderPath);
    const uploadPromises = files.map((fileName) => {
      const filePath = path.join(folderPath, fileName);
      const fileContent = fs.readFileSync(filePath);
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${this.keyPrefix}/logos/${fileName}`,
        Body: fileContent,
      };
      this.logger.log(
        `deleting folder Key:${params.Key}, Bucket:${params.Bucket}`,
      );
      return this.s3.upload(params).promise();
    });

    try {
      const results = await Promise.all(uploadPromises);
      return results.map((result) => result.Location);
    } catch (error) {
      throw new HttpException(
        'Error uploading folder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadMetadata(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const MAX_SIZE = 1 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new BusinessException('File size must not exceed 1MB.');
    }
    try {
      return await this.uploadImg(file, fileName);
    } catch (error) {
      throw new BusinessException(error.message);
    }
  }
}
