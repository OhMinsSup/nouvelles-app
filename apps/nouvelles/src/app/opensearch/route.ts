import { getRequestInDomainInfo } from '@nouvelles/libs';
import { Buffer } from 'node:buffer';
import { PAGE_ENDPOINTS } from '~/constants/constants';

export async function GET(request: Request) {
  const info = getRequestInDomainInfo(request);
  if (!info.domainUrl) {
    throw new Error('Could not determine domain URL.');
  }
  const xmlString = `
  <OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/"
    xmlns:moz="http://www.mozilla.org/2006/browser/search/">
    <ShortName>Nouvelles</ShortName>
    <Description>Nouvelles Find News</Description>
    <InputEncoding>[UTF-8]</InputEncoding>
    <Image width="16" height="16" type="image/png">${info.domainUrl}/icons/logo.png</Image>
    <Url type="text/html" template="${info.domainUrl}${PAGE_ENDPOINTS.NEWS.SEARCH}?q={searchTerms}"/>
  </OpenSearchDescription>
  `.trim();

  return new Response(xmlString, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(xmlString)),
    },
  });
}
