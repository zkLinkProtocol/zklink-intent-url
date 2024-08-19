const configFactory = async () => {
  return {
    env: process.env.ENV || '',
    port: parseInt(process.env.PORT || '2101', 10),
    jwt: {
      secret: process.env.JWT_SECRET || '',
      expirationTime: process.env.JWT_EXPIRATION_TIME || '3600s',
    },
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      bucket: process.env.AWS_BUCKET || '',
      region: process.env.AWS_REGION || '',
      keyPrefix: process.env.AWS_KEY_PREFIX || '',
      s3Url: process.env.AWS_S3_URL || '',
    },
  };
};

export default configFactory;
export type ConfigType = Awaited<ReturnType<typeof configFactory>>;
