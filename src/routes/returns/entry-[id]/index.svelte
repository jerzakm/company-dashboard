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
	import TransactionDetails from './_components/TransactionDetails.svelte';
	import ImageGallery from './_components/ImageGallery.svelte';
	import Notes from './_components/Notes.svelte';
	import { notifications } from '$lib/stores/notifications';
	import MissingDataBadges from './_components/MissingDataBadges.svelte';
	export let id;
	export let data;

	let entry: any = data;

	$: id && getEntryData();

	// update sender
	async function saveSender() {
		notifications.startLoader();

		try {
			const changedSender = await put('returns/edit/sender', entry.sender);
			if (changedSender.data) {
				entry.sender = changedSender.data;
				notifications.sendNotification($_('returns.entry.notifications.senderChanged'), 'success');
			}
			notifications.stopLoader();
		} catch (e) {
			notifications.sendNotification($_('returns.entry.notifications.senderChangeFailed'), 'error');
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
		console.log(entry);
	};
</script>

<svelte:head>
	<title>{$_('returns.entry.pageTitle')} #{id}</title>
</svelte:head>

<!-- <img src="http://localhost:3030/image/example/jpg" /> -->

{#if entry && entry.id == id}
	<div class="flex w-full flex-col gap-6 p-4">
		<div class="flex flex-col justify-between md:flex-row md:items-center">
			<div class="flex flex-col">
				<span>{$_('returns.entry.pageTitle')}</span>
				<h1 class="-mt-1">#{id}</h1>
			</div>
			<div class="flex flex-col items-end">
				<span class="text-sm text-[color:var(--text-color-light)]"
					>{formatToDateHour(entry.created_at)}</span
				>
				<MissingDataBadges {entry} />
			</div>
		</div>

		<Card>
			<span class="text-xl" slot="header">{$_('returns.entry.sender.header')}</span>
			<div slot="content" class="flex flex-col gap-4">
				<Input
					placeholder={$_('returns.entry.sender.name')}
					largeLabel
					bind:value={entry.sender.name}
					on:change={() => senderChange()}
					on:input={() => senderChange()}
				/>
				<Input
					placeholder={$_('returns.entry.sender.street')}
					largeLabel
					bind:value={entry.sender.street}
					on:change={() => senderChange()}
					on:input={() => senderChange()}
				/>
				<div class="flex gap-4">
					<Input
						placeholder={$_('returns.entry.sender.postCode')}
						largeLabel
						bind:value={entry.sender.postCode}
						on:change={() => senderChange()}
						on:input={() => senderChange()}
					/>
					<Input
						placeholder={$_('returns.entry.sender.city')}
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
			<span class="text-xl" slot="header">{$_('returns.entry.images.header')}</span>
			<div slot="content" class="flex flex-col gap-4">
				<ImageGallery
					{entry}
					on:newImageAdded={() => {
						getEntryData();
					}}
				/>
			</div>
		</Card>
		<Card>
			<span class="text-xl" slot="header">{$_('returns.entry.products.header')}</span>
			<div slot="content" class="flex flex-col gap-4 ">
				<ProductsList
					{entry}
					on:locationChanged={() => {
						getEntryData();
					}}
				/>
				<Modal
					title={$_('returns.entry.products.modal.header')}
					bind:showModal={showAddProductModal}
				>
					<AddProduct
						{entry}
						on:newProductAdded={async () => {
							await newProductAdded();
						}}
					/>
				</Modal>
				<Button on:click={() => (showAddProductModal = true)}
					>{$_('returns.entry.products.addNewButton')}</Button
				>
			</div>
		</Card>

		<Card>
			<span class="text-xl" slot="header">{$_('returns.entry.transactionDetails.header')}</span>
			<div slot="content" class="flex flex-col gap-4">
				<TransactionDetails
					{entry}
					on:detailsChanged={() => {
						getEntryData();
					}}
				/>
			</div>
		</Card>
		<Card>
			<span class="text-xl" slot="header">{$_('returns.entry.notes.header')}</span>
			<div slot="content" class="flex flex-col gap-4">
				<Notes
					{entry}
					on:noteAdded={() => {
						getEntryData();
					}}
				/>
			</div>
		</Card>
	</div>
{/if}
