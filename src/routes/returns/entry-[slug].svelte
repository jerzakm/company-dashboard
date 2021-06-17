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
	export let returnId;
</script>

<h1>{returnId}</h1>
