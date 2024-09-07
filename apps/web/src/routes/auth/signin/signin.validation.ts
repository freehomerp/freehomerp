import { z } from 'zod';

const ERROR_MESSAGE = {
  USERNAME_REQUIRED: 'Username is required',
  PASSWORD_REQUIRED: 'Password is required',
};

export default z.object({
  username: z
    .string({ required_error: ERROR_MESSAGE.USERNAME_REQUIRED })
    .trim()
    .min(1, { message: ERROR_MESSAGE.USERNAME_REQUIRED }),
  password: z
    .string({ required_error: ERROR_MESSAGE.PASSWORD_REQUIRED })
    .trim()
    .min(1, { message: ERROR_MESSAGE.PASSWORD_REQUIRED }),
});
