<script>
	import Layout from '$lib/components/Layout.svelte';
	import { _ } from 'svelte-i18n';
	import ReturnsSidebar from './_sidebar.svelte';
</script>

<svelte:head>
	<title>{$_('returns.main.pageTitle')}</title>
</svelte:head>

<Layout>
	<div slot="sidebar">
		<ReturnsSidebar active="/returns/locations" />
	</div>
	<div slot="content" class="w-full ">
		<h1>Returns</h1>
	</div>
</Layout>
