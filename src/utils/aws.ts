import AWS from 'aws-sdk';
import * as mime from 'mime-types';

export class Aws {
  private s3;
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

  public async uploadImg(file: any, fileName: string) {
    const mimeType = mime.lookup(fileName);
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
    return await this.uploadFile(file, fileName);
  }

  public async uploadFile(file: any, fileName: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Body: file.buffer,
    };
    await this.s3.putObject(params).promise();
    return 'https://zklink-intent.s3.amazonaws.com/' + fileName;
  }

  public async deleteFile(fileName: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
    };

    const result = await this.s3.deleteObject(params).promise();
    return result.error == null;
  }
}
