export type Address = `0x${string}`;
export type ErrorMessage = string;
export type SuccessMessage = string;
export type ActionId = string;
export type Settings = {
  newsType?: string;
  intentInfo: {
    network: NetworkDto;
    components: {
      value: string;
      options?: {
        label?: string;
        value: string;
        default: boolean;
      }[];
    }[];
  };

  intentList: {
    title: string;
    value: string;
    btnIndex?: number;
  }[][];
};
