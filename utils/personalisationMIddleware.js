import { MiddlewareRequest } from '@netlify/next';

export async function middleware(nextRequest) {

    console.log("MIDDLEWARE");

  if (nextRequest.nextUrl.pathname !== '/signup') {
    return;
  }

  const middlewareRequest = new MiddlewareRequest(nextRequest);
  const response = await middlewareRequest.next();

  const geo = nextRequest.geo;
  const address = geo?.city
    ? `${geo.city}, ${geo.region}, ${geo.country}`
    : 'Missoula, MT, US';


  const api = new URL('https://maps.googleapis.com/maps/api/geocode/json');

  api.searchParams.set('address', address);
  api.searchParams.set('key', Deno.env.get('NEXT_PUBLIC_GOOGLE_API_KEY') ?? '');

  const res = await fetch(api.toString());
  const data = await res.json();
  const [result] = data.results;

  if (!result || !result.geometry || !result.geometry.location) {
    return;
  }

  // transform the Next.js page props to use the updated data
  response.setPageProp('address', address);
  response.setPageProp('center', result.geometry.location);

  return response;
}