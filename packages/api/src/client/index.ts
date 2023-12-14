import { defaultFetchHandler } from '../fetch';
import { isString } from '@nouvelles/libs';
import { constructMethodCallUri } from '../fetch/utils';
import type { AgentFetchHandler } from '../types';
import type { CallOptions } from './types';
import type { QueryParams } from '../fetch/types';

export class BaseClient {
  fetch: AgentFetchHandler = defaultFetchHandler;

  service(serviceUri: string | URL, prefix?: string): ServiceClient {
    return new ServiceClient(this, serviceUri, prefix);
  }
}

export class ServiceClient {
  _baseClient: BaseClient;

  uri: URL;
  prefix?: string;
  app: AppNamespace;

  constructor(
    baseClient: BaseClient,
    serviceUri: string | URL,
    prefix?: string,
  ) {
    this._baseClient = baseClient;
    this.uri = isString(serviceUri) ? new URL(serviceUri) : serviceUri;
    this.prefix = prefix;
    this.app = new AppNamespace(this);
  }

  makePathname(pathname: string) {
    const prefix = this.prefix
      ? this.prefix.startsWith('/')
        ? this.prefix
        : `/${this.prefix}`
      : '';
    const pathnamePrefix = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return `${prefix}${pathnamePrefix}`;
  }
}

export class AppNamespace {
  _service: ServiceClient;
  item: ItemNamespace;
  category: CategoryNamespace;
  tag: TagNamespace;
  newspaper: NewspaperNamespace;

  constructor(service: ServiceClient) {
    this._service = service;
    this.item = new ItemNamespace(service);
    this.category = new CategoryNamespace(service);
    this.tag = new TagNamespace(service);
    this.newspaper = new NewspaperNamespace(service);
  }
}

export class ItemNamespace {
  _service: ServiceClient;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  createItems(body: any, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname('/items'),
      this._service.uri,
    );
    const httpHeaders = opts?.headers;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: 'POST',
      headers: httpHeaders,
      reqBody: body as unknown,
    });
  }

  getItems(params: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname('/items'),
      this._service.uri,
      params,
    );
    const httpHeaders = opts?.headers;
    const httpReqBody = undefined;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: 'GET',
      headers: httpHeaders,
      reqBody: httpReqBody,
    });
  }

  getItem(id: string, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(`/items/${id}`),
      this._service.uri,
    );
    const httpHeaders = opts?.headers;
    const httpReqBody = undefined;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: 'GET',
      headers: httpHeaders,
      reqBody: httpReqBody,
    });
  }
}

export class CategoryNamespace {
  _service: ServiceClient;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  getCategories(params?: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname('/categories'),
      this._service.uri,
      params,
    );
    const httpHeaders = opts?.headers;
    const httpReqBody = undefined;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: 'GET',
      headers: httpHeaders,
      reqBody: httpReqBody,
    });
  }
}

export class TagNamespace {
  _service: ServiceClient;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  getTags(params?: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname('/tags'),
      this._service.uri,
      params,
    );
    const httpHeaders = opts?.headers;
    const httpReqBody = undefined;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: 'GET',
      headers: httpHeaders,
      reqBody: httpReqBody,
    });
  }
}

export class NewspaperNamespace {
  _service: ServiceClient;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  getNewspapers(params?: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname('/newspapers'),
      this._service.uri,
      params,
    );
    const httpHeaders = opts?.headers;
    const httpReqBody = undefined;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: 'GET',
      headers: httpHeaders,
      reqBody: httpReqBody,
    });
  }
}
