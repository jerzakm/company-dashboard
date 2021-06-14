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
		<Item href="/about" activated={active === '/about'}>
			<Text>About</Text>
		</Item>
	</List>
</Content>

<style>
</style>
