import { type Actions, fail, redirect } from '@sveltejs/kit';

import type { SignInWithCredentialsUseCase } from '$lib/context/users/usecases/signin.usecase';
import { di } from '$lib/server/di';
import { createSessionCookie } from '$lib/server/utils/cookies';

import signinValidation from './signin.validation';

export function load({ locals }) {
  if (locals.sessionId != null) {
    throw redirect(303, '/');
  }
}

export const actions = {
  signin: async ({ cookies, request }) => {
    const signInWithCredentialsUseCase: SignInWithCredentialsUseCase = di.resolve('signInWithCredentialsUseCase');

    const formData = signinValidation.safeParse(Object.fromEntries(await request.formData()));
    if (!formData.success) {
      const { fieldErrors: errors } = formData.error.flatten();
      return fail(400, { errors });
    }

    const { username, password } = formData.data;
    const result = await signInWithCredentialsUseCase.execute({ username, password });
    if (!result.success) {
      return fail(401, { message: result.error.message });
    }

    const { session } = result.data;
    await createSessionCookie(cookies, session);
    return redirect(303, '/');
  },
} satisfies Actions;
