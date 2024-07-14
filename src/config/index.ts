export type NetworkKey = string;
export default async () => {
  const { PORT, JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

  return {
    port: parseInt(PORT, 10) || 2101,
    jwt: {
      secret: JWT_SECRET,
      expirationTime: JWT_EXPIRATION_TIME || '3600s',
    },
  };
};
