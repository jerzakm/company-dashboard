<script>
	import { Icon } from '@smui/button';
	export let ascending;
</script>

{#if ascending}
	<Icon class="material-icons">arrow_upward</Icon>
{:else}
	<Icon class="material-icons">arrow_downward</Icon>
{/if}
