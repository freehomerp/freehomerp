import { type Handle, redirect } from '@sveltejs/kit';

import { retrieveSessionCookie } from '$lib/server/utils/cookies';

export const handle: Handle = async ({ event, resolve }) => {
  // TODO: Retrieve session
  event.locals.sessionId = await retrieveSessionCookie(event.cookies);

  if (event.url.pathname == '/' && !event.locals.sessionId) {
    throw redirect(303, '/auth/signin');
  }

  const response = await resolve(event);
  return response;
};
