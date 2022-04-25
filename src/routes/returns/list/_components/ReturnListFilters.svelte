<script>
	import Input from '$lib/components/core/Input.svelte';
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let query = {
		sender: '',
		product: ''
	};
</script>

<div class="px-2 py-4">
	<div class="grid grid-cols-5 gap-2">
		<Input
			placeholder={$_('returns.entry.sender.header')}
			bind:value={query.sender}
			on:input={() => {
				dispatch('filterQuery', query);
			}}
		/>
		<Input
			placeholder={$_('returns.entry.products.header')}
			bind:value={query.product}
			on:input={() => {
				dispatch('filterQuery', query);
			}}
		/>
	</div>
</div>
