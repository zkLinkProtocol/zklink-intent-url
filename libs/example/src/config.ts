export type NetworkKey = string;
export default () => {
  return {
    multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    routerAddress: '0x2c98143431993e4CBD5eFD4B93c099432cacEBcE',
    rpcUrl: process.env.RPC_URL,
  };
};
