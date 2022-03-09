<script>
	import '../../../styles/app.css';

	import { goto } from '$app/navigation';
	import { authStore, checkStoredLogin } from '$lib/core/auth';
	import { onMount } from 'svelte';

	import '$lib/locale/i18n';

	export let user = null;

	authStore.subscribe(async (u) => {
		user = u;
		if (!user) {
			const verified = await checkStoredLogin();
			if (!verified) goto('/login');
		}
	});

	onMount(async () => {
		const verified = await checkStoredLogin();

		if (!verified) goto('/login');
	});
</script>

<div class="flex h-full">
	<slot />
</div>
