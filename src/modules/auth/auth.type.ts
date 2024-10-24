export type WebAppUser = {
  id: number;
  username: string;
};
export type WebAppInitData = {
  hash: string;
  user: WebAppUser;
};
