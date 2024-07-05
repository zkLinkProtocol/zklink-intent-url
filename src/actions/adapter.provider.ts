// registered-actions.provider.ts
import { Provider } from '@nestjs/common';
import { registeredActions } from './adapter';

export const REGISTERED_ACTIONS = 'REGISTERED_ACTIONS';

export const RegisteredActionsProvider: Provider = {
  provide: REGISTERED_ACTIONS,
  useValue: registeredActions,
};
