<script lang="ts">
	import Button, { Label } from '@smui/button';
	export let action;
	export let visible;
	let success = false;

	let lottieSuccess;

	const save = async () => {
		success = await action();

		if (success) {
			lottieSuccess.play();
			lottieSuccess.addEventListener('complete', () => (success = false));
		} else {
			alert(`update err`);
		}
	};
</script>

<saveBtn>
	<Button variant="raised" on:click={() => save()} class={`${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
		<Label>Zapisz</Label>
	</Button>
	<lottie-player bind:this={lottieSuccess} mode="normal" src="/lottie/confirmAnim.json" class={`${success ? 'block' : 'hidden'}`} />
</saveBtn>

<style>
	saveBtn {
		position: absolute;
		bottom: -2.7rem;
		right: 20px;
		transition: 0.1s linear all;
	}
</style>
