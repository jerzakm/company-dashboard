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

	import { onMount } from 'svelte';

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
	});
</script>

{#if entry}
	<div class="w-full flex flex-col p-4 gap-6">
		<span>Return entry</span>
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
	</div>
{/if}
