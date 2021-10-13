<script lang="ts">
	import Button, { Label } from '@smui/button';
	export let action;
	export let visible;
	let success = false;

	let lottie;

	const save = async () => {
		success = await action();
		if (success) {
			lottie.play();
		}
	};
</script>

<saveBtn>
	<Button variant="raised" on:click={() => save()} class={`${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
		<Label>Zapisz</Label>
	</Button>
	<lottie-player bind:this={lottie} mode="normal" src="/lottie/confirmAnim.json" />
</saveBtn>

<style>
	saveBtn {
		position: absolute;
		bottom: -2.7rem;
		right: 20px;
		transition: 0.1s linear all;
	}
</style>
