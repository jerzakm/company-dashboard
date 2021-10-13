<script lang="ts">
	import { formatToDateHour } from '$lib/timeUtil';

	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

	export let returnEvents: any[];
</script>

<DataTable table$aria-label="Lista zmian" class="w-full">
	<Head>
		<Row>
			<!-- return Id -->
			<Cell>Data</Cell>
			<Cell style="width:3rem;">Użytkownik</Cell>
			<Cell style="width:3rem;">Typ</Cell>
			<Cell style="width:100%;">Szczegóły</Cell>
		</Row>
	</Head>
	{#if returnEvents}
		<Body>
			{#each returnEvents as event}
				<Row>
					<Cell>{formatToDateHour(event.created_at)}</Cell>
					<Cell>{event.user.name}</Cell>
					<Cell>{event.description}</Cell>
					<Cell>{event.diff}</Cell>
				</Row>
			{/each}
		</Body>
	{/if}
</DataTable>
