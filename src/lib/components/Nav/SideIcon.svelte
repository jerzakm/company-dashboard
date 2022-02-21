<script>
	export let href;
</script>

<button>
	<a class="flex items-center justify-center h-10 w-10 rounded  " {href}>
		<!-- svg slot -->
		<slot />
	</a>
</button>

<style>
	a {
		color: var(--text-color-light);
	}
	a:hover {
		background-color: var(--text-color-strong);
	}
</style>
