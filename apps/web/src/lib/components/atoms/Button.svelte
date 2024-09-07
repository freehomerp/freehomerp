<script lang="ts" context="module">
  type ButtonType = 'submit';
</script>

<script lang="ts">
  export let text: string;
  export let type: ButtonType = 'submit';
</script>

<button {type} class="mt-6 w-full rounded-md p-4 text-white" class:bg-primary={type == 'submit'}>{text}</button>
