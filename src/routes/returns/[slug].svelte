<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		return {
			props: {
				returnId: page.params.slug
			}
		};
	}
</script>

<script>
	import Paper, { Title, Content } from '@smui/paper';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import { get, put } from '$lib/api';
	import { onMount } from 'svelte';
	import SaveChangesButton from './_components/SaveChangesButton.svelte';
	import ReturnImageGallery from './_components/ReturnImageGallery.svelte';
	import ReturnEventsTable from './_components/ReturnEventsTable.svelte';
	import ReturnProductsTable from './_components/ReturnProductsTable.svelte';
	import AddNewFile from './_components/AddNewFile.svelte';
	import ReturnNotes from './_components/ReturnNotes.svelte';
	import ReturnSaleSource from './_components/ReturnSaleSource.svelte';

	export let returnId;
	let data;
	let originalData = {};

	const updateReturnEntry = async () => {
		data = await get(`returns/list?id=${returnId}`);
		originalData = JSON.parse(JSON.stringify(data));
	};

	const saveSenderChanges = async () => {
		let success = false;
		try {
			const changedSender = await put('returns/edit/sender', data.sender);
			originalData.sender = changedSender;
			success = true;
		} catch (e) {
			console.log(e);
			alert('Err');
		}
		return success;
	};

	onMount(async () => {
		await updateReturnEntry();
	});
</script>

<h1>#{returnId}</h1>

<grid>
	<Paper class="col-span-2" elevation={4}>
		<Content class="relative">
			{#if data}
				<div class="flex flex-col">
					<span class="text-lg font-bold">Nadawca</span>
					<div>
						<Textfield bind:value={data.sender.name} label="Imie i Nazwisko / Firma" style="width: 100%;" helperLine$style="width: 100%;" />
					</div>

					<div>
						<Textfield bind:value={data.sender.street} label="Ulica" style="width: 100%;" helperLine$style="width: 100%;" />
					</div>

					<div>
						<Textfield bind:value={data.sender.postCode} label="Kod pocztowy" style="width: 100%;" helperLine$style="width: 100%;" />
					</div>

					<div>
						<Textfield bind:value={data.sender.city} label="Miejscowość" style="width: 100%;" helperLine$style="width: 100%;" />
					</div>
				</div>
				<SaveChangesButton
					action={saveSenderChanges}
					visible={JSON.stringify(data.sender) != JSON.stringify(originalData.sender)}
					label={'Zapisz zmiany w nadawcy'}
				/>
			{/if}
		</Content>
	</Paper>
	<Paper class="col-span-4" elevation={4}>
		<Content class="relative h-full">
			<span class="text-lg font-bold">Produkty</span>

			{#if data}
				<ReturnProductsTable returnEntry={data} on:change={() => updateReturnEntry()} />
			{/if}
		</Content>
	</Paper>

	<div class="flex flex-col gap-10 col-span-2">
		<Paper elevation={4}>
			<Content class="relative">
				{#if data}
					<div class="flex flex-col">
						<span class="text-lg font-bold">Źródło sprzedaży</span>
						<ReturnSaleSource returnEntry={data} on:change={() => updateReturnEntry()} />
					</div>
				{/if}
			</Content>
		</Paper>
		<Paper elevation={4}>
			<Content class="relative">
				{#if data}
					<div class="flex flex-col">
						<span class="text-lg font-bold">Powód zwrotu</span>
					</div>
				{/if}
			</Content>
		</Paper>
		<Paper elevation={4}>
			<Content class="relative">
				{#if data}
					<div class="flex flex-col">
						<span class="text-lg font-bold">Lokalizacja</span>
					</div>
				{/if}
			</Content>
		</Paper>
		<Paper elevation={4}>
			<Content class="relative">
				{#if data}
					<div class="flex flex-col">
						<span class="text-lg font-bold">Status</span>
					</div>
				{/if}
			</Content>
		</Paper>
	</div>

	<div class="col-span-4 flex flex-col gap-10">
		<Paper class="col-span-4 " elevation={4}>
			<Content class="relative">
				{#if data}
					<div class="flex flex-col">
						<ReturnNotes returnEntry={data} on:change={() => updateReturnEntry()} />
					</div>
				{/if}
			</Content>
		</Paper>
		<!-- FILE GALLERY -->
		<Paper class="col-span-4" elevation={4}>
			<Content class="relative">
				<span class="text-lg font-bold">Galeria</span>
				{#if data}
					<ReturnImageGallery returnEntry={data} on:change={() => updateReturnEntry()} />
				{/if}
			</Content>
		</Paper>
	</div>

	<!-- EVENTS HISTORY -->
	<Paper class="col-span-6" elevation={4}>
		<Content class="relative">
			<span class="text-lg font-bold">Historia zmian</span>
			{#if data}
				<ReturnEventsTable returnEvents={data.events} />
			{/if}
		</Content>
	</Paper>
</grid>

<style lang="scss">
	grid {
		@apply flex;
		@apply flex-col;
		@apply gap-10;

		@media (min-width: 1024px) {
			display: grid;
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}

	saveBtn {
		position: absolute;
		bottom: -2.7rem;
		right: 20px;
	}
</style>
