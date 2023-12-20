export function getLocationInDomainInfo(location: Location) {
  const host = location.host;
  const isLocalhost = host.includes('localhost');
  const protocol = isLocalhost ? 'http' : 'https';
  return {
    host,
    protocol,
    isLocalhost,
    domainUrl: `${protocol}://${host}`,
  };
}
