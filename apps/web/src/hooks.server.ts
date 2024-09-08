import { type Handle, redirect } from '@sveltejs/kit';

import config from '$lib/server/config';

export const handle: Handle = async ({ event, resolve }) => {
  // TODO: Retrieve session
  event.locals.session = event.cookies.get(config.session.cookie);

  if (event.url.pathname == '/' && !event.locals.session) {
    throw redirect(303, '/auth/signin');
  }

  const response = await resolve(event);
  return response;
};
