<script>
	import { fade } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div class={$$props.class} in:fade={{ duration: 250, delay: 20 }}>
		<slot />
	</div>
{/key}
