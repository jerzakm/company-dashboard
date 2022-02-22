<script>
	import Layout from '$lib/components/Layout.svelte';
	import ReturnsSidebar from './_sidebar.svelte';
</script>

<Layout>
	<div slot="sidebar">
		<ReturnsSidebar active="/returns/outlet" />
	</div>
	<div slot="content" class="w-full ">
		<h1>Outlet</h1>
	</div>
</Layout>
