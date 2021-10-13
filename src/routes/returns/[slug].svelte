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
		console.log(data);
	});
</script>

<h1>#{returnId}</h1>

<grid>
	<Paper class="col-span-2" elevation={4}>
		<Content class="relative">
			{#if data}
				<div class="content-grid">
					<span class="text-lg font-bold">Nadawca</span>
					<div class="col-span-2">
						<Textfield bind:value={data.sender.name} label="Imie i Nazwisko / Firma" style="width: 100%;" helperLine$style="width: 100%;" />
					</div>
					<filler />
					<div class="col-span-2">
						<Textfield bind:value={data.sender.street} label="Ulica" style="width: 100%;" helperLine$style="width: 100%;" />
					</div>
					<filler />
					<div class="col-span-2">
						<Textfield bind:value={data.sender.postCode} label="Kod pocztowy" style="width: 100%;" helperLine$style="width: 100%;" />
					</div>
					<filler />
					<div class="col-span-2">
						<Textfield bind:value={data.sender.city} label="Miejscowość" style="width: 100%;" helperLine$style="width: 100%;" />
					</div>
				</div>
				<SaveChangesButton action={saveSenderChanges} visible={JSON.stringify(data.sender) != JSON.stringify(originalData.sender)} />
			{/if}
		</Content>
	</Paper>
	<div class="col-span-2" />
</grid>

<style lang="scss">
	grid {
		@apply grid;
		@apply grid-cols-6;
		@apply gap-2;
	}
	.content-grid {
		@apply grid;
		@apply grid-cols-3;
	}
	saveBtn {
		position: absolute;
		bottom: -2.7rem;
		right: 20px;
	}
</style>
