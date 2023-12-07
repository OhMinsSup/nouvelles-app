import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { logger } from "./log";
import { makeEnvFileName } from "./utils";
import { defaultOptions } from "./options";
import type { Options } from "./options";
import type { EnvType } from "./constants";

const processEnv = (config: Options) => {
  let envFileData: dotenv.DotenvConfigOutput;

  const rootPath = path.resolve();
  const loadPath = config.loadPath
    ? path.resolve(rootPath, config.loadPath, config.loadName)
    : path.resolve(rootPath, config.loadName);

  const saveEnvPath = config.savePath
    ? path.resolve(rootPath, config.savePath, config.saveName)
    : path.resolve(rootPath, config.saveName);

  try {
    envFileData = dotenv.config({
      path: loadPath,
    });

    if (envFileData.error) {
      throw envFileData.error;
    }
  } catch (error) {
    throw error;
  }

  if (!envFileData.parsed) {
    const error = new Error();
    error.name = "EnvironmentError";
    error.message = `Please check the config file: "${loadPath}"`;
    throw error;
  }

  const envData = envFileData.parsed;

  fs.copyFileSync(loadPath, saveEnvPath);

  logger.success(
    `[Environment] - Successfully created environment file: "${saveEnvPath}"`
  );

  return envData;
};

export const load = (_options: Partial<Options>) => {
  const envType = (_options.envType || defaultOptions.envType) as EnvType;
  const config: Options = {
    saveName: _options.saveName || defaultOptions.saveName,
    envType,
    loadPath: _options.loadPath || defaultOptions.loadPath,
    loadName: makeEnvFileName(envType),
    savePath: _options.savePath || defaultOptions.savePath,
  };

  try {
    const envData = processEnv(config);
    if (!envData) {
      _options.onError?.();
      logger.error(`[Environment] - Please check the config file`);
      return null;
    }

    _options.onSuccess?.(envData);
    logger.info(`[Environment] - ${JSON.stringify(envData)}`);
    return envData;
  } catch (error) {
    _options.onError?.(error);
    logger.error(`[Environment] -`, error);
    return null;
  }
};
