<script>
	import Input from '$lib/components/core/Input.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let query = {
		sender: ''
	};
</script>

<Input
	bind:value={query.sender}
	on:input={() => {
		dispatch('filterQuery', query);
	}}
/>
