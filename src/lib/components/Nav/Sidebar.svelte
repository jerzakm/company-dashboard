<script>
	import SideIcons from './SideIcons.svelte';

	export let visible = false;
</script>

<sidebar class={`${visible || window?.innerWidth > 640 ? 'flex' : 'hidden'}`}>
	<SideIcons />
	<div class="flex h-screen w-64 flex-col border-r ">
		<div class="flex max-h-12 items-center border-b px-6" style="min-height: 3rem;">
			<h4 class="font-bold">Company dashboard</h4>
		</div>
		<div class="flex flex-grow overflow-y-auto">
			<div class="my-6 flex flex-grow flex-col space-y-4 overflow-y-auto">
				<slot />
			</div>
		</div>
	</div>
</sidebar>
