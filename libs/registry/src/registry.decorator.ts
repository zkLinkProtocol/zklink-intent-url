import { SetMetadata } from '@nestjs/common';

export const ACTION_PLUG = 'ACTION_PLUG';

export const RegistryPlug = (id: string, version: string) =>
  SetMetadata(ACTION_PLUG, { id, version });
