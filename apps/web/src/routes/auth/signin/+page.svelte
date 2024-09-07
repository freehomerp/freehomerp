<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/atoms/Button.svelte';
  import FormInput from '$lib/components/molecules/FormInput.svelte';

  import type { ActionData, SubmitFunction } from '../signin/$types';
  import signinValidation from './signin.validation';

  export let form: ActionData;

  const formSubmit: SubmitFunction = ({ formData, cancel }) => {
    const data = signinValidation.safeParse(Object.fromEntries(formData));
    if (!data.success) {
      const { fieldErrors: errors } = data.error.flatten();
      form = { errors };
      cancel();
    }
  };
</script>

<form
  class="mx-auto max-w-md rounded-md bg-white p-8 md:mt-8 md:shadow lg:mt-20"
  method="post"
  use:enhance={formSubmit}
  action="?/signin"
>
  <h1 class="text-primary text-center text-2xl">Sing In</h1>

  <div class="mt-4">
    <FormInput name="username" label="Username" placeholder="Username" error={form?.errors?.username} />
  </div>

  <div class="mt-4">
    <FormInput type="password" name="password" label="Password" placeholder="Password" error={form?.errors?.password} />
  </div>

  <div class="text-error font-light" class:invisible={!form?.message}>
    {form?.message}
  </div>

  <Button text="Sign In" />
</form>
