<script>
	import Button from '$lib/components/core/Button.svelte';
	import Input from '$lib/components/core/Input.svelte';
	import { _ } from 'svelte-i18n';
	import Modal from '$lib/components/core/Modal.svelte';

	import { post } from '$lib/core/api';
	import { formatToDateHour } from '$lib/util/time';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let entry;

	let content;

	let showModal = false;

	async function addNote() {
		if (content.length < 5) {
			alert('Note too short, must be at least 5 characters long.');
			return;
		}

		const changedDocuments = await post('returns/edit/notes', {
			returnId: entry.id,
			content
		});
		if (changedDocuments.data) {
			content = '';
			showModal = false;
			dispatch('noteAdded');
		}
	}
</script>

<div class="flex flex-col gap-6">
	<notes class="mt-4 flex flex-col gap-2">
		{#each entry.notes as note, i}
			<note class={i % 2 == 0 ? 'bg-[color:var(--background-color)]' : ''}>
				<span class="px-2 text-xs text-[color:var(--text-color-light)]">
					{formatToDateHour(note.created_at)} - {note.user.name}
				</span>
				<p class="px-2">
					{note.content}
				</p>
			</note>
		{/each}
	</notes>
	<Button on:click={() => (showModal = true)}>{$_('returns.entry.notes.add')}</Button>
</div>

<Modal title={$_('returns.entry.notes.add')} bind:showModal class="flex flex-col items-end gap-6">
	<Input textArea class="h-48 w-full" bind:value={content} />
	<Button class="w-full lg:w-1/2" on:click={() => addNote()}
		>{$_('returns.entry.notes.save')}</Button
	>
</Modal>
