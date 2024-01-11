/* eslint-disable @typescript-eslint/restrict-template-expressions */
interface InternalUrl {
  /** "http://localhost:3000" */
  origin: string;
  /** "localhost:3000" */
  host: string;
  /** "/api/auth" */
  path: string;
  /** "http://localhost:3000/api/auth" */
  base: string;
  /** "http://localhost:3000/api/auth" */
  toString: () => string;
}

/** Returns an `URL` like object to make requests/redirects from server-side */
export function parseUrl(url?: string | URL): InternalUrl {
  const defaultUrl = new URL('http://localhost:3000/api/auth');

  if (url && !url.toString().startsWith('http')) {
    // eslint-disable-next-line no-param-reassign
    url = `https://${url}`;
  }

  const _url = new URL(url ?? defaultUrl);
  const path = (
    _url.pathname === '/' ? defaultUrl.pathname : _url.pathname
  ).replace(/\/$/, '');

  const base = `${_url.origin}${path}`;

  return {
    origin: _url.origin,
    host: _url.host,
    path,
    base,
    toString: () => base,
  };
}
