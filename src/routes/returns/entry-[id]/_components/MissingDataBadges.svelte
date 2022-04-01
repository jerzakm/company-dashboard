<script>
	import Badge from '$lib/components/core/Badge.svelte';
	import { checkEntryStatusRequirements } from '$lib/returnLogic/entryStatus';

	import { _ } from 'svelte-i18n';

	export let entry;

	$: missingData = checkEntryStatusRequirements(entry);
	$: console.log(missingData);
</script>

<badges class={`flex gap-2 ${$$props.class}`}>
	{#each Object.keys(missingData) as badge}
		{#if !missingData[badge]}
			<Badge text={$_(`returns.entry.statusEntry.${badge}`)} type={'error'} pulse />
		{/if}
	{/each}
</badges>
