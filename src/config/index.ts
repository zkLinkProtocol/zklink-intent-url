const configFactory = async () => {
  return {
    env: (process.env.ENV || 'dev') as 'dev' | 'prod',
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
    witnessPrivateKey: process.env.WITNESS_PRIVATE_KEY || '',
    turnkeyApi: process.env.TURNKEY_API || '',
    rpc: {
      810180: process.env.Nova_RPC_URL || '',
      1: process.env.Ethereum_RPC_URL || '',
      324: process.env.Zksync_RPC_URL || '',
      59144: process.env.Linea_RPC_URL || '',
      42161: process.env.Arbitrum_RPC_URL || '',
      10: process.env.Optimism_RPC_URL || '',
      8453: process.env.Base_RPC_URL || '',
      5000: process.env.Mantle_RPC_URL || '',
      169: process.env.Manta_RPC_URL || '',
      534352: process.env.Scroll_RPC_URL || '',
    },
    tgbot: {
      tgbot: process.env.TGBOT || '',
      webHookUrl: process.env.TGBOT_WEBHOOK_URL || '',
      pollApi: process.env.TGBOT_POLL_API || '',
      token: process.env.TGBOT_TOKEN,
      miniApp: process.env.TGBOT_MINI_APP || '',
      newsChannelId: process.env.NEWS_CHANNEL_ID || '',
      userMiniApp: process.env.TGBOT_USER_MINI_APP || '',
    },
  };
};

export default configFactory;
export type ConfigType = Awaited<ReturnType<typeof configFactory>>;
