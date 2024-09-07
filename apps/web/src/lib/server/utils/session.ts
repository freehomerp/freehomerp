import type { Cookies } from '@sveltejs/kit';

import config from '../config';

export function createSessionCookie(cookies: Cookies, value: string) {
  cookies.set(config.session.cookie, value, {
    sameSite: 'strict',
    path: '/',
    maxAge: config.session.max_age,
    httpOnly: true,
    secure: config.env === 'production',
    domain: config.session.domain,
  });
}

export function retrieveSession(cookies: Cookies): string | undefined {
  return cookies.get(config.session.cookie);
}
