import { Command } from 'commander';
import { load } from './load';
import { defaultOptions } from './options';
import type { Options } from './options';

export async function main() {
  let options: Options = defaultOptions;
  const program = new Command().name('@nouvelles/eli');

  program
    .description('@nouvelles/eli')
    .option(
      '--env-type <envType>',
      `Environment type. Defaults to ${options.envType}.`,
    )
    .option(
      '--save-name <saveName>',
      `Root directory of the project. Defaults to ${options.saveName}.`,
    )
    .option(
      '--save-path <savePath>',
      `Environment to deploy to. Defaults to ${options.savePath}.`,
    )
    .option(
      '--load-name <loadName>',
      `Environment to deploy to. Defaults to ${options.loadName}.`,
    )
    .option(
      '--load-path <loadPath>',
      `Environment to deploy to. Defaults to ${options.loadPath}.`,
    )
    .parse(process.argv);

  options = program.opts<Options>();

  return load(options);
}
