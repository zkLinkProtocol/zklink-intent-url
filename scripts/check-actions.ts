import 'reflect-metadata';
import path from 'path';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { ActionMetadata } from '../src/common/dto';

const argv = yargs(hideBin(process.argv))
  .option('module', {
    alias: 'm',
    type: 'string',
    description: 'Module name to validate data from',
    demandOption: true,
  })
  .help()
  .alias('help', 'h').argv as { module: string };

async function loadModuleData(moduleName: string) {
  const modulePath = `libs/${moduleName}/src/index.ts`;
  const fullPath = path.resolve(process.cwd(), modulePath);
  const module = await import(fullPath);
  if (!module.default) {
    throw new Error(
      `The module at ${fullPath} does not export 'default' module.`,
    );
  }
  const { getMetadata } = module.default;
  if (!getMetadata) {
    throw new Error(
      `The module at ${fullPath} does not implement getMetadata method in 'Action' class.`,
    );
  }

  return module.default;
}

async function validateData(data: any) {
  const actionMetadataInstance = plainToInstance(ActionMetadata, data);
  const errors = await validate(actionMetadataInstance);

  if (errors.length > 0) {
    console.error('Validation failed. Errors: ', errors);
  } else {
    console.log('Validation succeeded');
  }
}

async function main() {
  try {
    const module = await loadModuleData(argv.module);
    const data = await module.getMetadata();
    await validateData(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
