<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params }) {
		return {
			props: {
				id: params.id
			}
		};
	}
</script>

<script>
	import Card from '$lib/components/core/Card.svelte';
	import Input from '$lib/components/core/Input.svelte';
	import { get, put } from '$lib/core/api';
	import { debounce } from '$lib/util/debounce';
	import { formatToDateHour } from '$lib/util/time';

	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import ProductsList from './_components/ProductsList.svelte';

	export let id;

	let entry;

	async function saveSender() {
		const changedSender = await put('returns/edit/sender', entry.sender);
		if (changedSender.data) {
			entry.sender = changedSender.data;
		}
	}
	const senderChange = debounce(() => saveSender(), 500);

	onMount(async () => {
		const { data } = await get(`returns/list/${id}`);
		entry = data;
		console.log(entry);
	});
</script>

<svelte:head>
	<title>{$_('returns.entry.pageTitle')} #{id}</title>
</svelte:head>

{#if entry}
	<div class="w-full flex flex-col p-4 gap-6">
		<div class="flex justify-between items-center">
			<span>Return entry</span>
			<span class="text-[color:var(--text-color-light)] text-sm"
				>{formatToDateHour(entry.created_at)}</span
			>
		</div>
		<h1 class="-mt-6">#{id}</h1>
		<Card>
			<span class="text-xl" slot="header">Sender</span>
			<div slot="content" class="flex flex-col gap-4">
				<Input
					placeholder="Name"
					largeLabel
					bind:value={entry.sender.name}
					on:change={() => senderChange()}
					on:input={() => senderChange()}
				/>
				<Input
					placeholder="Street"
					largeLabel
					bind:value={entry.sender.street}
					on:change={() => senderChange()}
					on:input={() => senderChange()}
				/>
				<div class="flex gap-4">
					<Input
						placeholder="Postcode"
						largeLabel
						bind:value={entry.sender.postCode}
						on:change={() => senderChange()}
						on:input={() => senderChange()}
					/>
					<Input
						placeholder="City"
						class="w-full"
						largeLabel
						bind:value={entry.sender.city}
						on:change={() => senderChange()}
						on:input={() => senderChange()}
					/>
				</div>
			</div>
		</Card>
		<Card>
			<span class="text-xl" slot="header">Products</span>
			<div slot="content" class="flex flex-col gap-4">
				<ProductsList {entry} />
			</div>
		</Card>
		<Card>
			<span class="text-xl" slot="header">Transaction & return details</span>
			<div slot="content" class="flex flex-col gap-4">asd</div>
		</Card>
	</div>
{/if}
