export type NetworkKey = string;
export default async () => {
  const { PORT } = process.env;

  return {
    port: parseInt(PORT, 10) || 2101,
  };
};
