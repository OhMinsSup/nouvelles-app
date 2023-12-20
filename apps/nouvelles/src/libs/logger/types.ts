import type { AxiomRequest } from 'next-axiom';

type LogCategory =
  | 'client'
  | 'server'
  | 'api'
  | 'db'
  | 'middleware'
  | 'pages'
  | 'components'
  | 'logging';

type Extra = Record<string, any>;

export interface LogMethodParams {
  label: LogCategory;
  message: string;
  error?: Error;
  extra?: Extra;
  request?: AxiomRequest;
}

export type LogMethod = (params: LogMethodParams) => void;

export interface LoggerService {
  info: LogMethod;
  debug: LogMethod;
  log: LogMethod;
  warn: LogMethod;
  error: LogMethod;
}
