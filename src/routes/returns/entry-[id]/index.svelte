<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params }) {
		const { data } = await get(`returns/list/${params.id}`);

		return {
			props: {
				id: params.id,
				data
			}
		};
	}
</script>

<script lang="ts">
	import Card from '$lib/components/core/Card.svelte';
	import Input from '$lib/components/core/Input.svelte';
	import { get, put } from '$lib/core/api';
	import { debounce } from '$lib/util/debounce';
	import { formatToDateHour } from '$lib/util/time';
	import { _ } from 'svelte-i18n';
	import AddProduct from './_components/AddProduct.svelte';
	import ProductsList from './_components/ProductsList.svelte';
	import Modal from '$lib/components/core/Modal.svelte';
	import Button from '$lib/components/core/Button.svelte';
	export let id;
	export let data;

	let entry: any = data;

	$: id && getEntryData();

	// update sender
	async function saveSender() {
		const changedSender = await put('returns/edit/sender', entry.sender);
		if (changedSender.data) {
			entry.sender = changedSender.data;
		}
	}
	const senderChange = debounce(() => saveSender(), 500);

	// Add new product
	let showAddProductModal;
	const newProductAdded = async () => {
		await getEntryData();
		showAddProductModal = false;
	};

	const getEntryData = async () => {
		const { data } = await get(`returns/list/${id}`);
		entry = data;
	};
</script>

<svelte:head>
	<title>{$_('returns.entry.pageTitle')} #{id}</title>
</svelte:head>

{#if entry && entry.id == id}
	<div class="flex w-full flex-col gap-6 p-4">
		<div class="flex items-center justify-between">
			<span>Return entry</span>
			<span class="text-sm text-[color:var(--text-color-light)]"
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
			<div slot="content" class="flex flex-col gap-4 ">
				<ProductsList {entry} />
				<Modal title="Add a new product" bind:showModal={showAddProductModal}>
					<AddProduct
						{entry}
						on:newProductAdded={async () => {
							await newProductAdded();
						}}
					/>
				</Modal>
				<Button on:click={() => (showAddProductModal = true)}>Add</Button>
			</div>
		</Card>
		<Card>
			<span class="text-xl" slot="header">Transaction & return details</span>
			<div slot="content" class="flex flex-col gap-4">asd</div>
		</Card>
	</div>
{/if}
