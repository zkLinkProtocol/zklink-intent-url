import fs from 'fs';
import path from 'path';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import { lookup } from 'mime-types';

import { BusinessException } from 'src/exception/business.exception';

@Injectable()
export class FilesService {
  private readonly s3: AWS.S3;

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
      throw new Error(
        'File type must be an image (JPEG, PNG, GIF, BMP, WEBP, TIFF, SVG, ICO).',
      );
    }
    return this.uploadFile(file, fileName);
  }

  public async uploadFile(file: Express.Multer.File, fileName: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Body: file.buffer,
    };
    const result = await this.s3.upload(params).promise();
    return result.Location;
  }

  public async deleteFile(fileName: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
    };

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
        Key: fileName,
        Body: fileContent,
      };
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
      return await this.uploadFile(file, fileName);
    } catch (error) {
      throw new BusinessException(error.message);
    }
  }
}
