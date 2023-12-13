import { defaultFetchHandler } from '../fetch';
import { isString } from '@nouvelles/libs';
import { constructMethodCallUri } from '../fetch/utils';
import type { AgentFetchHandler } from '../types';
import type { CallOptions } from './types';
import type { QueryParams } from '../fetch/types';

export class BaseClient {
  fetch: AgentFetchHandler = defaultFetchHandler;

  service(serviceUri: string | URL): ServiceClient {
    return new ServiceClient(this, serviceUri);
  }
}

export class ServiceClient {
  _baseClient: BaseClient;

  uri: URL;
  app: AppNamespace;

  constructor(baseClient: BaseClient, serviceUri: string | URL) {
    this._baseClient = baseClient;
    this.uri = isString(serviceUri) ? new URL(serviceUri) : serviceUri;
    this.app = new AppNamespace(this);
  }
}

export class AppNamespace {
  _service: ServiceClient;
  item: ItemNamespace;

  constructor(service: ServiceClient) {
    this._service = service;
    this.item = new ItemNamespace(service);
  }
}

export class ItemNamespace {
  _service: ServiceClient;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  createItems(body: any, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri('/items', this._service.uri);
    const httpHeaders = opts?.headers;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: 'POST',
      headers: httpHeaders,
      reqBody: body as unknown,
    });
  }

  getItems(params: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri('/items', this._service.uri, params);
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
    const httpUri = constructMethodCallUri(`/items/${id}`, this._service.uri);
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
