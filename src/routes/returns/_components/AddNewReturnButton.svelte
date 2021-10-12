<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import { post } from '$lib/api';
	import { defaultCleanReturnEntry } from '../_listUtil';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const addNewReturn = async () => {
		console.log('adding new return');
		try {
			const addedReturn = await post('returns/new', defaultCleanReturnEntry());
			if (addedReturn.id) {
				console.log(addedReturn.id);
				dispatch('newReturnAdded', { id: addedReturn.id });
			}
		} catch (e) {
			console.log(e);
			alert('Error adding a new return');
		}
	};
</script>

<Button touch variant="raised" on:click={() => addNewReturn()}>
	<Icon class="material-icons">add</Icon>
	<Label>Dodaj nowy</Label>
</Button>
