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
					{#if data.returnReason?.category}
						{data.returnReason.category} - {data.returnReason.reason}
					{:else}
						{$_('returnEvents.saleSourceUpdate.null')}
					{/if}
				{:else if event.type.includes('returnEvents.saleDocumentUpdate')}
					{data.saleDocument}
				{:else if event.type.includes('returnEvents.saleSourceUpdate')}
					{#if data.saleSource}
						{data.saleSource.name} {data.saleSource.subCategory}
					{:else}
						{$_('returnEvents.saleSourceUpdate.null')}
					{/if}
				{:else if event.type.includes('returnEvents.shippingCompanyUpdate')}
					{data.ShippingCompany ? data.ShippingCompany.name : '-'}
				{:else if event.type.includes('returnEvents.paymentMethod')}
					{#if data.PaymentMethod}
						{data.PaymentMethod.name}
					{:else}
						{$_('returnEvents.saleSourceUpdate.null')}
					{/if}
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
