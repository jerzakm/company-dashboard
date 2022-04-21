<script>
	import { _ } from 'svelte-i18n';
	import { formatToDateHour } from '$lib/util/time';
	export let entry;

	console.log(entry.events);
</script>

<div class="flex flex-col gap-6">
	<events class="mt-4 grid items-center gap-y-4">
		{#each entry.events as event, i}
			{@const data = JSON.parse(event.data)}

			<span>{formatToDateHour(event.created_at)}</span>
			<span>{event.user.name}</span>
			<span>
				{$_(`${event.type}`)}
			</span>
			<span>
				{#if event.type.includes('retunEvents.sender.changed')}
					{data.to}
				{:else if event.type.includes('retunEvents.image.added')}
					<img class="max-h-16" src={`/api/images/${data.id}_400.${data.extension}`} />
				{:else if event.type.includes('retunEvents.product.location.change')}
					{data.to.name} - {data.to.subName}
				{:else if event.type.includes('retunEvents.note.add')}
					<span class="italic text-xs">{data.content}</span>
				{:else if event.type.includes('returnEvents.productAdded')}
					{data?.name} - [{data?.symbol}]
				{:else if event.type.includes('returnEvents.productRemoved')}
					{data.name} - [{data.symbol}]
				{:else if event.type.includes('returnEvents.returnReasonUpdate')}
					{data.returnReason.category} - {data.returnReason.reason}
				{:else}
					{event.data}
				{/if}
			</span>
		{/each}
	</events>
</div>

<style>
	events {
		grid-template-columns: 12rem 9rem 8rem 1fr;
	}
	@media (max-width: 960px) {
		events {
			grid-template-columns: 1fr 1fr;
		}
	}
	span {
		@apply px-2;
	}
</style>
