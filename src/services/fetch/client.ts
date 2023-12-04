// libs
import { isEmpty, isString } from "~/utils/assertion";
import { isBrowser } from "~/libs/browser/dom";

// errors
import { FetchError } from "./error";

// constants
import { API_ENDPOINTS } from "./constants";

// types

export class FetchService {
  baseURL = isBrowser
    ? (function () {
        return "http://localhost:3000";
      })()
    : (function () {
        return "http://localhost:3000";
      })();

  prefix = "/api";

  defineApis = API_ENDPOINTS;

  getSearchParams = (
    url: FetchSchema.ApiRoutes | string,
    params?: URLSearchParams | string
  ) => {
    if (!params) {
      return url;
    }
    const textSearchParams = isString(params)
      ? params.replace(/^\?/, "")
      : new URLSearchParams(params).toString();
    const searchParams = "?" + textSearchParams;
    const toStringUrl = isString(url) ? url : url.toString();
    return toStringUrl.replace(/(?:\?.*?)?(?=#|$)/, searchParams);
  };

  makeURL = (
    request: FetchSchema.ApiRoutes,
    options?: FetchSchema.ApiOptions
  ) => {
    let _prefix = this.prefix.endsWith("/")
      ? this.prefix.slice(0, -1)
      : this.prefix;

    const { v1 } = options?.customOptions?.flag ?? {};
    if (v1) {
      _prefix = `${_prefix}/v1/`;
    } else {
      _prefix = `${_prefix}/`;
    }

    const _baseURL = _prefix
      ? new URL(_prefix, this.baseURL)
      : this.baseURL
        ? new URL(this.baseURL)
        : undefined;

    if (!_baseURL) {
      throw new Error("baseURL is undefined");
    }

    if (request instanceof URL) {
      const url = new URL(request.toString(), _baseURL.toString());
      return {
        url: url,
        pathname: url.pathname,
      };
    }

    if (isString(request)) {
      const _fullURL = `${_baseURL.toString()}${request}`;
      const url = new URL(_fullURL);
      return {
        url: url,
        pathname: url.pathname,
      };
    }

    const _clone = new URL(request.url);
    const _fullURL = `${_baseURL.toString()}${_clone.pathname}`;
    const url = new URL(_fullURL);
    return {
      url: url,
      pathname: url.pathname,
    };
  };

  makeBody = (body?: FetchSchema.Body) => {
    if (body instanceof FormData) {
      return body;
    }

    if (!body) {
      return undefined;
    }

    if (isEmpty(body)) {
      return undefined;
    }

    if (!isString(body)) {
      return JSON.stringify(body);
    }

    return body as BodyInit;
  };

  async get(request: FetchSchema.ApiRoutes, options?: FetchSchema.ApiOptions) {
    const { url } = this.makeURL(request, options);
    const requset = new Request(url, {
      ...options?.requestInit,
      method: "GET",
    });
    const response = await fetch(requset);
    if (!response.ok) {
      throw new FetchError(response, requset, options);
    }
    return response;
  }

  async post(
    request: FetchSchema.ApiRoutes,
    input?: FetchSchema.Body,
    options?: FetchSchema.ApiOptions
  ) {
    const { url } = this.makeURL(request, options);
    const body = this.makeBody(input);
    const requset = new Request(url, {
      ...options?.requestInit,
      method: "POST",
      body,
    });
    const response = await fetch(requset);
    if (!response.ok) {
      throw new FetchError(response, requset, options);
    }
    return response;
  }

  async delete(
    request: FetchSchema.ApiRoutes,
    options?: FetchSchema.ApiOptions
  ) {
    const { url } = this.makeURL(request, options);
    const requset = new Request(url, {
      ...options?.requestInit,
      method: "DELETE",
    });
    const response = await fetch(requset);
    if (!response.ok) {
      throw new FetchError(response, requset, options);
    }
    return response;
  }

  async put(
    request: FetchSchema.ApiRoutes,
    input?: FetchSchema.Body,
    options?: FetchSchema.ApiOptions
  ) {
    const { url } = this.makeURL(request, options);
    const body = this.makeBody(input);
    const requset = new Request(url, {
      ...options?.requestInit,
      method: "PUT",
      body,
    });
    const response = await fetch(requset);
    if (!response.ok) {
      throw new FetchError(response, requset, options);
    }
    return response;
  }

  async toJson<FetchData = any>(response: Response) {
    return response.json() as Promise<FetchData>;
  }

  async raw(input: RequestInfo | URL, init?: RequestInit | undefined) {
    const requset = new Request(input, init);
    const response = await fetch(requset);
    if (!response.ok) {
      throw new FetchError(response, requset, undefined);
    }
    return response;
  }
}

export const fetchService = new FetchService();
