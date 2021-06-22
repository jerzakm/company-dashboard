<script>
	import Drawer, { AppContent, Content, Header, Title, Subtitle } from '@smui/drawer';
	import List, { Item, Text } from '@smui/list';
	import { page } from '$app/stores';

	$: active = $page.path;
</script>

<Content>
	<List>
		<sectionTitle>Zwroty</sectionTitle>
		<Item href="/" activated={active === '/'}>
			<Text>Home</Text>
		</Item>
		<Item href="/about" activated={active === '/about'}>
			<Text>About</Text>
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
