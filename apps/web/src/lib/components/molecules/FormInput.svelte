<script lang="ts">
  import Input, { type InputType } from '../atoms/Input.svelte';

  export let name;
  export let type: InputType = 'text';
  export let label: string;
  export let placeholder: string = '';
  export let required: boolean = false;

  export let error: string[] | undefined;
</script>

<label for={name}>{label}:</label>
<div class="mt-2">
  <Input {type} {name} {placeholder} {required} />
</div>
<div class="relative h-6">
  {#if error}
    <label class="text-error absolute bottom-0 text-sm font-light" for={name}>{error[0]}</label>
  {/if}
</div>
