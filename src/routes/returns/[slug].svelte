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
	import Textfield from '@smui/textfield';
	import { get } from '$lib/api';
	import { onMount } from 'svelte';

	export let returnId;
	let data;
	let originalData = {};

	const updateReturnEntry = async () => {
		data = await get(`returns/list?id=${returnId}`);
		Object.assign(originalData, data);
	};

	onMount(async () => {
		await updateReturnEntry();
		console.log(data);
	});
</script>

<h1>#{returnId}</h1>

<grid>
	<Paper class="col-span-2" elevation={4}>
		<Content>
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
			{/if}
		</Content>
	</Paper>
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
</style>
