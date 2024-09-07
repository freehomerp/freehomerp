import { type Handle, redirect } from '@sveltejs/kit';

import { retrieveSession } from '$lib/server/utils/session';

export const handle: Handle = async ({ event, resolve }) => {
  // TODO: Retrieve session
  event.locals.session = retrieveSession(event.cookies);

  if (event.url.pathname == '/' && !event.locals.session) {
    throw redirect(303, '/auth/signin');
  }

  const response = await resolve(event);
  return response;
};
