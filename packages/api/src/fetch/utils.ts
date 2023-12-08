import { isString, isUndefined, isFunction } from '@nouvelles/libs';
import { NouvellesError, ErrorType } from '@nouvelles/error';

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
  headers: Headers | Record<string, string>,
): Headers {
  const normalized: Headers = new Headers();
  for (const [header, value] of Object.entries(headers)) {
    normalized.set(header.toLowerCase(), value);
  }
  return normalized;
}

export function encodeMethodCallBody(
  headers: Headers,
  data?: any,
): ArrayBuffer | undefined {
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

// fetch response headers to Object.fromEntries format
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
