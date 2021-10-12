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
	import Paper, { Title, Subtitle, Content } from '@smui/paper';

	export let returnId;
</script>

<h1>{returnId}</h1>

<h3>Nadawca</h3>
<Paper class="paper-demo" elevation={4}>
	<Title>Paper</Title>
	<Subtitle>This is a sheet of paper.</Subtitle>
	<Content>Paper is used to build an elevated surface.</Content>
</Paper>

<style>
</style>
