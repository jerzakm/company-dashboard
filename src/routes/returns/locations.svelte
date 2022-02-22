<script>
	import Layout from '$lib/components/Layout.svelte';
	import ReturnsSidebar from './_sidebar.svelte';
</script>

<Layout>
	<div slot="sidebar">
		<ReturnsSidebar active="/returns/locations" />
	</div>
	<div slot="content" class="w-full ">
		<h1>By location</h1>
	</div>
</Layout>
