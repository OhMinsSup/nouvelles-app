export interface AgentFetchHandlerResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
}

export type AgentFetchHandlerOptions = {
  uri: string;
  method: string;
  headers: Headers | Record<string, string>;
  reqBody: any;
};

export type AgentFetchHandler = (
  opts: AgentFetchHandlerOptions,
) => Promise<AgentFetchHandlerResponse>;

export type AgentConfigureOptions = {
  fetch: AgentFetchHandler;
};

export interface AgentOpts {
  service: string | URL;
}
