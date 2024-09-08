import { type Actions, fail, redirect } from '@sveltejs/kit';

import config from '$lib/server/config';
import type { UsersService } from '$lib/server/context/application/users.service';
import { di } from '$lib/server/di';

import signinValidation from './signin.validation';

export const actions = {
  signin: async ({ cookies, request }) => {
    const usersService: UsersService = di.resolve('usersService');

    const formData = signinValidation.safeParse(Object.fromEntries(await request.formData()));
    if (!formData.success) {
      const { fieldErrors: errors } = formData.error.flatten();
      return fail(400, { errors });
    }

    const { username, password } = formData.data;
    const result = await usersService.signinWithCredentials({ username, password });
    if (!result.success) {
      return fail(401, { message: 'Credentials invalid' });
    }

    cookies.set(config.session.cookie, result.data.session.id, {
      sameSite: 'strict',
      path: '/',
      maxAge: config.session.maxAge,
      httpOnly: true,
      secure: config.env === 'production',
      domain: config.session.domain,
    });
    return redirect(303, '/');
  },
} satisfies Actions;
