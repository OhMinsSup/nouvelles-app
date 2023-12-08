import type { FetchHandlerOptions, FetchHandlerResponse } from '../fetch/types';

export type CallOptions = Partial<
  Pick<FetchHandlerOptions, 'headers' | 'reqBody'> & {}
>;

export type GetItemsHandler = (
  params: any,
  opts?: CallOptions | undefined,
) => Promise<FetchHandlerResponse>;

export type GetItemHandler = (
  id: string,
  opts?: CallOptions | undefined,
) => Promise<FetchHandlerResponse>;
