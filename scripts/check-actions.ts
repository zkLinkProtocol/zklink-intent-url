import 'reflect-metadata';
import path from 'path';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { Action, ActionMetadata } from '../src/common/dto';

const argv = yargs(hideBin(process.argv))
  .option('module', {
    alias: 'm',
    type: 'string',
    description: 'Module name to validate data from',
    demandOption: true,
  })
  .option('params', {
    alias: 'p',
    type: 'string',
    description: 'Parameters for the transaction in JSON format',
    demandOption: true,
  })
  .help()
  .alias('help', 'h').argv as { module: string; params: string };

async function loadModuleData(moduleName: string): Promise<Action> {
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
  }
}

async function main() {
  try {
    const module = await loadModuleData(argv.module);
    const data = await module.getMetadata();
    await validateData(data);
    const { tx, provider } = await module.generateTransaction(
      JSON.parse(argv.params),
    );
    const gasEstimate = await provider.estimateGas(tx);
    console.log(
      'Transaction simulation succeeded. Estimated gas:',
      gasEstimate.toString(),
    );
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
