import { type Actions, fail, redirect } from '@sveltejs/kit';

import { createSessionCookie } from '$lib/server/utils/session';

import signinValidation from './signin.validation';

export const actions = {
  signin: async ({ cookies, request }) => {
    const formData = signinValidation.safeParse(Object.fromEntries(await request.formData()));
    if (!formData.success) {
      const { fieldErrors: errors } = formData.error.flatten();
      return fail(400, { errors });
    }


    const result = { success: false };
    if (!result.success) {
      return fail(401, { message: 'Credentials invalid' });
    }

    createSessionCookie(cookies, 'sessionid');
    return redirect(303, '/');
  },
} satisfies Actions;
