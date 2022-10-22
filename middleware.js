import { MiddlewareRequest } from '@netlify/next';

export async function middleware(nextRequest) {

  if (nextRequest.nextUrl.pathname !== '/signup') {
    return;
  }

  const middlewareRequest = new MiddlewareRequest(nextRequest);
  const response = await middlewareRequest.next();

  const GOOGLE_API_KEY = Deno.env.get('NEXT_PUBLIC_GOOGLE_API_KEY');
  const address = nextRequest.cookies.get('state');

  const api = new URL('https://maps.googleapis.com/maps/api/geocode/json');

  api.searchParams.set('address', address);
  api.searchParams.set('key', GOOGLE_API_KEY);

  const res = await fetch(api.toString());
  const data = await res.json();
  const [result] = data.results;

  if (!result || !result.geometry || !result.geometry.location) {
    return;
  }

  response.setPageProp('address', address);
  response.setPageProp('mapCords', result.geometry.location);

  return response;
}