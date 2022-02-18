<!-- <script>
	import Textfield from '@smui/textfield';
	import SvelteMarkdown from 'svelte-markdown';
	import dayjs from 'dayjs';

	let content = '';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label, Icon } from '@smui/button';
	import { post } from '$lib/api';
	import { createEventDispatcher } from 'svelte';
	import { formatToDateHour } from '$lib/timeUtil';

	export let returnEntry;

	const dispatch = createEventDispatcher();

	const addNewNote = async () => {
		const newNote = await post('returns/edit/note', {
			content,
			returnId: returnEntry.id
		});

		if (newNote) {
			content = '';
			dispatch('change');
		}
	};

	const sortNotes = (notes) => {
		function compare(a, b) {
			if (dayjs(a.created_at).isAfter(dayjs(b.created_at))) {
				return -1;
			}
			if (dayjs(a.created_at).isBefore(dayjs(b.created_at))) {
				return 1;
			}
			return 0;
		}

		return notes.sort(compare);
	};

	let open = false;

	$: notes = sortNotes(returnEntry.notes);
</script>

<div class="flex justify-between">
	<span class="text-lg font-bold">Notatki</span>
	<Button on:click={() => (open = true)} variant="raised">
		<Label>Dodaj</Label>
		<Icon class="material-icons">add_circle_outlined</Icon>
	</Button>
</div>

{#each notes as note}
	<note>
		<content>
			<SvelteMarkdown source={note.content} />
		</content>
		<span />
		<span />
		<span class="text-gray-700 italic text-right -mt-2">{formatToDateHour(note.created_at)} - {note.user.name}</span>
	</note>
{/each}

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content" fullscreen style="min-height: 200px; max-width: unset;">
	<Title>Nowa notatka</Title>
	<Content style="min-width:450px;">
		<Textfield
			style="width: 100%; min-height: 400px; margin-top: 1rem;"
			helperLine$style="width: 100%;"
			textarea
			bind:value={content}
			label="Notatka"
		/>
		<p>
			Notatki można pisać używając <a href="https://docs.microsoft.com/pl-pl/contribute/markdown-reference"> [Markdown] </a>
		</p>
	</Content>

	<Actions>
		<Button on:click={() => (content = '')}>
			<Label>Anuluj</Label>
		</Button>
		<Button on:click={() => addNewNote()}>
			<Label>Zapisz</Label>
		</Button>
	</Actions>
</Dialog>

<style lang="scss">
	note {
		@apply w-full;
		@apply grid;
		@apply grid-cols-3;
		@apply mb-4;
		border-bottom: 1px solid rgb(179, 179, 179, 0.5);
		content {
			@apply col-span-3;
			@apply -mb-2;
		}
	}
</style> -->
