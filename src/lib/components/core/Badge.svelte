<script>
	export let text = '';
	export let type = 'info';
	export let pulse = false;
</script>

<badge style={`background-color: var(--${type}-color`} class:pulse>
	{text}
</badge>

<style>
	badge {
		@apply text-black;
		@apply rounded-lg px-2 py-1;
	}

	.pulse {
		animation: pulse-animation 2s infinite cubic-bezier(0.645, 0.045, 0.355, 1);
	}

	@keyframes pulse-animation {
		0% {
			box-shadow: 0 0 0 0px rgba(255, 0, 0, 1);
		}
		100% {
			box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
		}
	}
</style>
