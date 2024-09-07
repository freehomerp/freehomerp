<script lang="ts" context="module">
  export type InputType = 'text' | 'password';
</script>

<script lang="ts">
  import { EyeRegular, EyeSlashRegular } from 'svelte-awesome-icons';

  export let name: string;
  export let type: InputType = 'text';
  export let placeholder: string = '';
  export let required: boolean = false;

  let innerType = type;

  function togglePasword() {
    innerType = innerType == 'password' ? 'text' : 'password';
  }
</script>

<div class="relative h-10">
  <input
    type={innerType}
    {name}
    class="border-neutral-2 focus:border-primary bg-neutral-1 h-full w-full rounded-md border px-2 focus:outline-none"
    {placeholder}
    {required}
  />
  {#if type == 'password'}
    <button type="button" class="absolute inset-y-0 end-0 right-2" on:click|preventDefault={togglePasword}>
      {#if innerType == 'password'}
        <EyeRegular class="text-neutral-3" />
      {:else}
        <EyeSlashRegular class="text-neutral-3" />
      {/if}
    </button>
  {/if}
</div>
