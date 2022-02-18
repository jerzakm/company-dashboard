<!-- <script lang="ts">
	import { formatToDateHour } from '$lib/timeUtil';
	import dayjs from 'dayjs';

	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import type { ReturnEvent } from '@prisma/client';

	export let returnEvents: any[];

	const sortEvents = (events): ReturnEvent[] => {
		function compare(a, b) {
			if (dayjs(a.created_at).isAfter(dayjs(b.created_at))) {
				return -1;
			}
			if (dayjs(a.created_at).isBefore(dayjs(b.created_at))) {
				return 1;
			}
			return 0;
		}

		return events.sort(compare);
	};

	let open = false;

	$: events = sortEvents(returnEvents);
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
			{#each events as event}
				<Row>
					<Cell>{formatToDateHour(event.created_at)}</Cell>
					<Cell>{event.user.name}</Cell>
					<Cell>{event.description}</Cell>
					<Cell>{event.diff}</Cell>
				</Row>
			{/each}
		</Body>
	{/if}
</DataTable> -->
