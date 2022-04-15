<script>
	import { _ } from 'svelte-i18n';
	import { formatToDateHour } from '$lib/util/time';
	export let entry;
</script>

<div class="flex flex-col gap-6">
	<events class="mt-4 grid items-center gap-y-4">
		{#each entry.events as event, i}
			{@const data = JSON.parse(event.data)}

			<span class={i % 2 == 0 ? 'bg-[color:var(--background-color)]' : ''}
				>{formatToDateHour(event.created_at)}</span
			>
			<span class={i % 2 == 0 ? 'bg-[color:var(--background-color)]' : ''}>{event.user.name}</span>
			<span class={i % 2 == 0 ? 'bg-[color:var(--background-color)]' : ''}>
				{$_(`${event.type}`)}
			</span>
			<span class={i % 2 == 0 ? 'bg-[color:var(--background-color)]' : ''}>
				{#if event.type.includes('retunEvents.sender.changed')}
					{data.to}
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
