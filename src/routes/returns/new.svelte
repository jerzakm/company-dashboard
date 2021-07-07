<script lang="ts">
	import ProductSearch from '$lib/components/ProductSearch.svelte';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text/index';
	import Card from '@smui/card';

	const newReturn = {
		name: '',
		street: '',
		postCode: '',
		city: '',
		country: 'PL'
	};

	let product;
</script>

<h1>Nowy zwrot</h1>

<newReturn>
	<Card padded>
		<container>
			<h2>Nadawca</h2>
			<!-- name -->
			<div>
				<Textfield variant="outlined" bind:value={newReturn.name} label="Imię i nazwisko / Firma" style="width:100%;" class="test">
					<Icon class="material-icons" slot="leadingIcon">person_outline</Icon>
				</Textfield>
			</div>
			<!-- street -->
			<div>
				<Textfield variant="outlined" bind:value={newReturn.street} label="Ulica" style="width:100%;">
					<Icon class="material-icons" slot="leadingIcon">edit_road</Icon>
				</Textfield>
			</div>
			<!-- postCode -->
			<cityPost>
				<Textfield variant="outlined" bind:value={newReturn.postCode} label="Kod pocztowy" style="width:20%;">
					<Icon class="material-icons" slot="leadingIcon">my_location</Icon>
				</Textfield>
				<!-- city -->
				<Textfield variant="outlined" bind:value={newReturn.city} label="Miejscowość" style="flex: 1; margin-left: 0.6rem;">
					<Icon class="material-icons" slot="leadingIcon">location_city</Icon>
				</Textfield>
			</cityPost>
		</container>
		<!-- <ProductSearch bind:product /> -->
	</Card>
</newReturn>

<style>
	newReturn {
		display: flex;
		flex-direction: column;
	}
	container > * {
		margin: 0.6rem 0;
	}
	h2 {
		margin-bottom: 2rem;
	}
	cityPost {
		width: 100%;
		display: flex;
	}
</style>
