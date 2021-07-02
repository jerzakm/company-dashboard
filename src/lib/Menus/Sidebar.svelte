<script>
	import Drawer, { AppContent, Content, Header, Title, Subtitle } from '@smui/drawer';
	import List, { Item, Text } from '@smui/list';
	import { page } from '$app/stores';

	$: active = $page.path;
</script>

<Content>
	<List>
		<Item href="/" activated={active === '/'}>
			<Text>Home</Text>
		</Item>
		<sectionTitle>Zwroty</sectionTitle>
		<Item href="/returns/list" activated={active === '/returns/list'}>
			<Text>Lista</Text>
		</Item>
		<Item href="/returns/new" activated={active === '/returns/new'}>
			<Text>Dodaj nowy</Text>
		</Item>
		<sectionTitle>Admin</sectionTitle>
		<Item href="/admin/products" activated={active === '/admin/products'}>
			<Text>Produkty</Text>
		</Item>
	</List>
</Content>

<style>
	sectionTitle {
		margin-left: 1rem;
		font-weight: bold;
	}
</style>
