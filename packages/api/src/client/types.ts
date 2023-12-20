import type {
  FetchHandlerOptions,
  FetchHandlerResponse,
  QueryParams,
} from '../fetch/types';

export type CallOptions = Partial<
  Pick<FetchHandlerOptions, 'headers' | 'reqBody'>
>;

export type CreateItemsHandler = (
  body: any,
  opts?: CallOptions | undefined,
) => Promise<FetchHandlerResponse>;

export type GetItemsHandler = (
  params: QueryParams,
  opts?: CallOptions | undefined,
) => Promise<FetchHandlerResponse>;

export type GetItemHandler = (
  id: string,
  opts?: CallOptions | undefined,
) => Promise<FetchHandlerResponse>;

export type GetCategoriesHandler = (
  params?: QueryParams,
  opts?: CallOptions | undefined,
) => Promise<FetchHandlerResponse>;

export type GetTagsHandler = (
  params?: QueryParams,
  opts?: CallOptions | undefined,
) => Promise<FetchHandlerResponse>;

export type GetNewspapersHandler = (
  params?: QueryParams,
  opts?: CallOptions | undefined,
) => Promise<FetchHandlerResponse>;
