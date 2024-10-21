import { chainConfig } from './chain';

const configFactory = async () => {
  return {
    env: (process.env.ENV || 'dev') as 'dev' | 'prod',
    port: parseInt(process.env.PORT || '3010', 10),
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
    witnessPrivateKey: process.env.WITNESS_PRIVATE_KEY || '',
    turnkeyApi: process.env.TURNKEY_API || '',
    chains: chainConfig,
    tgbot: {
      tgbot: process.env.TGBOT || '',
      webHookUrl: process.env.TGBOT_WEBHOOK_URL || '',
      pollApi: process.env.TGBOT_POLL_API || '',
      token: process.env.TGBOT_TOKEN,
      miniApp: process.env.TGBOT_MINI_APP || '',
      supportLink: process.env.SUPPORT_LINK || '',
      alertChannelId: process.env.ALERT_CHANNEL_ID || '',
      newsChannelIdCn: process.env.NEWS_CHANNEL_ID_CN || '',
      newsChannelIdEn: process.env.NEWS_CHANNEL_ID_EN || '',
      userMiniApp: process.env.TGBOT_USER_MINI_APP || '',
    },
    okx: {
      secretKey: process.env.OKX_SECRET_KEY || '',
      accessKey: process.env.OKX_ACCESS_KEY || '',
      passphrase: process.env.OKX_PASSPHRASE || '',
      nftSignerPrivateKey: process.env.OKX_SIGNER_PRIVATE_KEY || '',
    },
  };
};

export default configFactory;
export type ConfigType = Awaited<ReturnType<typeof configFactory>>;
