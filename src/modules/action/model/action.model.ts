import { Action } from 'src/common/dto';

export interface RegistryAction {
  id: string;
  version: string;
  service: Action;
}
