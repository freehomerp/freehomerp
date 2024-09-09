import type { Cookies } from '@sveltejs/kit';

import type Session from '$lib/context/users/domain/session.aggregate';

import config from '../config';

export async function createSessionCookie(cookies: Cookies, { id: { value: sessionId } }: Session): Promise<void> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode('secretpassword'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );

  const sign = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(sessionId));
  const value = btoa(sessionId) + '.' + btoa(String.fromCharCode(...new Uint8Array(sign)));
  cookies.set(config.session.cookie, value, {
    sameSite: 'strict',
    path: '/',
    maxAge: config.session.maxAge,
    httpOnly: true,
    secure: config.env === 'production',
    domain: config.session.domain,
  });
}

export async function retrieveSessionCookie(cookies: Cookies): Promise<string | undefined> {
  const value = cookies.get(config.session.cookie);
  if (value == null) {
    return value;
  }

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode('secretpassword'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );

  const [valueId, valueSign] = value.split('.');
  const sessionId = atob(valueId);
  const sessionSign = Uint8Array.from(atob(valueSign), c => c.charCodeAt(0));
  const result = await crypto.subtle.verify(
    'HMAC',
    key,
    sessionSign,
    new TextEncoder().encode(sessionId),
  )
  return result ? sessionId : undefined;
}
