'server-only';
export function getRequestInDomainInfo(request: Request) {
  return getHeaderInDomainInfo(request.headers);
}

export function getHeaderInDomainInfo(headers: Headers | Readonly<Headers>) {
  const host =
    headers.get('X-Forwarded-Host') ??
    headers.get('Origin') ??
    headers.get('host');

  if (!host) {
    throw new Error('Could not determine domain URL.');
  }

  const isLocalhost = host.includes('localhost');
  const protocol = isLocalhost ? 'http' : 'https';
  return {
    host,
    protocol,
    isLocalhost,
    domainUrl: `${protocol}://${host}`,
  };
}
