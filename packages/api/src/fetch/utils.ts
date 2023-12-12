import { isString, isUndefined, isFunction, isNull } from '@nouvelles/libs';
import { NouvellesError, ErrorType } from '@nouvelles/error';
import { QueryParams } from './types';

export const getSearchParams = (
  url: URL | string,
  params?: URLSearchParams | string,
) => {
  if (!params) {
    return url;
  }
  const textSearchParams = isString(params)
    ? params.replace(/^\?/, '')
    : new URLSearchParams(params).toString();
  const searchParams = '?' + textSearchParams;
  const toStringUrl = isString(url) ? url : url.toString();
  return toStringUrl.replace(/(?:\?.*?)?(?=#|$)/, searchParams);
};

export function normalizeHeaders(
  headers: Headers | Record<string, string> | undefined,
): Headers | undefined {
  if (isUndefined(headers)) {
    return undefined;
  }

  const normalized: Headers = new Headers();

  for (const [header, value] of Object.entries(headers)) {
    normalized.set(header.toLowerCase(), value);
  }
  return normalized;
}

export function encodeMethodCallBody(
  headers: Headers | undefined,
  data?: any,
): ArrayBuffer | undefined {
  if (isUndefined(headers)) {
    return undefined;
  }

  const contentType = headers.get('content-type');
  if (!contentType || isUndefined(data)) {
    return undefined;
  }
  if (data instanceof ArrayBuffer) {
    return data;
  }

  if (contentType.startsWith('text/')) {
    return new TextEncoder().encode(data.toString());
  }

  if (contentType.startsWith('application/json')) {
    return new TextEncoder().encode(JSON.stringify(data));
  }

  return data;
}

export function normalizeResponseHeaders(
  headers: Headers,
): Record<string, string> {
  // headers.entries() returns an iterator of key, value pairs
  // Object.fromEntries() turns this into an object
  const supportEntries = 'entries' in headers && isFunction(headers.entries);
  if (supportEntries) {
    // @ts-ignore TS2339: Property 'entries' does not exist on type 'Headers'.
    return Object.fromEntries(headers.entries());
  }

  const normalized: Record<string, string> = {};
  for (const [header, value] of Object.entries(headers)) {
    normalized[header.toLowerCase()] = value;
  }
  return normalized;
}

export async function httpResponseBodyParse(
  mimeType: string | null,
  res: Response,
) {
  if (mimeType) {
    if (mimeType.includes('application/json')) {
      try {
        return await res.json();
      } catch (e) {
        throw new NouvellesError(
          ErrorType.ResponseError,
          `Failed to parse response body: ${String(e)}`,
        );
      }
    }
    if (mimeType.startsWith('text/')) {
      try {
        return await res.text();
      } catch (e) {
        throw new NouvellesError(
          ErrorType.ResponseError,
          `Failed to parse response body: ${String(e)}`,
        );
      }
    }

    try {
      return await res.blob();
    } catch (error) {
      throw new NouvellesError(
        ErrorType.ResponseError,
        `Failed to parse response body: ${String(error)}`,
      );
    }
  }

  return res;
}

export function constructMethodCallUri(
  pathname: string,
  serviceUri: URL,
  params?: QueryParams,
): string {
  const uri = new URL(serviceUri);
  uri.pathname = pathname;

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (!isNull(value) || !isUndefined(value)) {
        if (Array.isArray(value)) {
          uri.searchParams.append(
            key,
            value.map((v) => encodeQueryParam('unknown', v)).join(','),
          );
        } else {
          const hasToString = Object.prototype.hasOwnProperty.call(
            value,
            'toString',
          );

          if (hasToString) {
            uri.searchParams.append(
              key,
              encodeQueryParam('unknown', value.toString()),
            );
          } else {
            uri.searchParams.append(key, encodeQueryParam('unknown', value));
          }
        }
      }
    }
  }

  return uri.toString();
}

export function encodeQueryParam(
  type:
    | 'string'
    | 'float'
    | 'integer'
    | 'boolean'
    | 'datetime'
    | 'array'
    | 'unknown',
  value: any,
): string {
  if (type === 'string' || type === 'unknown') {
    return String(value);
  }
  if (type === 'float') {
    return String(Number(value));
  } else if (type === 'integer') {
    return String(Number(value) | 0);
  } else if (type === 'boolean') {
    return value ? 'true' : 'false';
  } else if (type === 'datetime') {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return String(value);
  }
  throw new Error(`Unsupported query param type: ${type}`);
}
