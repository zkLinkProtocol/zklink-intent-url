import type { ActionId, ActionMetadata } from 'src/common/interfaces';

export interface ActionResponseDto extends ActionMetadata {
  id: ActionId;
}
