import { NouvellesError, ErrorType } from '@nouvelles/error';
import { defaultFetchHandler } from './fetch';

import type { FetchHandlerOptions } from './fetch/types';
import type {
  AgentConfigureOptions,
  AgentFetchHandler,
  AgentOpts,
} from './types';

export class Agent {
  service: URL;

  static fetch: AgentFetchHandler | undefined = defaultFetchHandler;

  static configure(opts: AgentConfigureOptions) {
    Agent.fetch = opts.fetch;
  }

  constructor(opts: AgentOpts) {
    this.service =
      opts.service instanceof URL ? opts.service : new URL(opts.service);
  }

  private async _fetch(opts: FetchHandlerOptions) {
    if (!Agent.fetch) {
      throw new NouvellesError(
        ErrorType.AgentError,
        'AtpAgent fetch() method not configured',
      );
    }

    // send the request
    const res = await Agent.fetch({
      uri: opts.uri,
      method: opts.method,
      headers: opts.headers,
      reqBody: opts.reqBody,
    });

    return res;
  }
}
