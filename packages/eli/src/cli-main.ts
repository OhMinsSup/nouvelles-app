import { Command } from "commander";
import { load } from "./load";
import { defaultOptions } from "./options";
import type { Options } from "./options";

export async function main() {
  let options: Options = defaultOptions;
  const program = new Command().name("@nouvelles/eli");

  program
    .description("@nouvelles/eli")
    .option(
      "--root <root>",
      `Root directory of the project. Defaults to ${options.rootEnvName}.`,
      options.rootEnvName
    )
    .option(
      "--env <env>",
      `Environment to deploy to. Defaults to ${options.envType}.`,
      options.envType
    )
    .option(
      "--entry <entry>",
      `Environment to deploy to. Defaults to ${options.entryFile}.`,
      options.entryFile
    )
    .parse(process.argv);

  options = program.opts<Options>();

  return await load(options);
}
