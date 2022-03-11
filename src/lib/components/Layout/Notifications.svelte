<script lang="ts">
	import { notificationStore, notifications } from '$lib/stores/notifications';
	import { fly } from 'svelte/transition';

	let notificationOptions = null;

	notificationStore.subscribe((v) => {
		notificationOptions = v;
	});
</script>

{#if notificationOptions?.loader}
	<loader class="flex flex-col items-center justify-center">
		<!-- credit to Temani Afif https://dev.to/afif/adding-100-css-loaders-to-the-collection-of-500-css-loaders-2a3p -->
		<div class="animated-loader" />
	</loader>
{/if}

<!-- {#if notificationOptions.notifications.length > 0} -->
<snackbar>
	{#each notificationOptions?.notifications as notification (notification.id)}
		<notification
			style={`background-color: var(--${notification.type}-color`}
			in:fly={{ delay: 20, duration: 250, y: 20 }}
			out:fly={{ delay: 0, duration: 250, y: -200 }}
		>
			<span>{notification.text}</span>
		</notification>
	{/each}
</snackbar>

<!-- {/if} -->
<style>
	loader {
		position: fixed;
		top: 0;
		left: 0;
		/* background-color: rgba(255, 255, 255, 0.02); */
		/* backdrop-filter: blur(1px); */
		width: 100%;
		height: 100%;
		z-index: 9999;
	}
	.animated-loader {
		--c: linear-gradient(var(--primary-color) 0 0);
		background: var(--c), var(--c), var(--c), var(--c), var(--c), var(--c), var(--c), var(--c),
			var(--c);
		background-size: 16px 16px;
		background-repeat: no-repeat;
		animation: sh2-1 1s infinite, sh2-2 1s infinite;
	}

	@keyframes sh2-1 {
		0%,
		100% {
			width: 45px;
			height: 45px;
			transform: scale(1);
		}
		35%,
		65% {
			width: 65px;
			height: 65px;
			transform: scale(1.05);
		}
	}

	@keyframes sh2-2 {
		0%,
		40% {
			background-position: 0 0, 0 50%, 0 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0, 50% 0, 50% 50%;
		}
		60%,
		100% {
			background-position: 0 50%, 0 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0, 50% 0, 0 0, 50% 50%;
		}
	}

	snackbar {
		@apply flex w-full flex-col items-center gap-2;
		@apply fixed top-0 left-0 w-screen;
		@apply mt-2;
		flex-grow: 1;
		z-index: 10000;
		transition: 2s all linear;
	}
	notification {
		@apply text-black;
		@apply rounded px-2 py-1;
		flex-grow: 1;
		transition: all 250ms linear;
	}
</style>
