<script lang="ts">
	import { TimerType, type TimerState } from '../state/app.svelte';
	let { state }: { state: TimerState } = $props();

	// const timerFormatted = '00:00:00';
	const timerFormatted = $derived.by(() => {
		const timerType = state.timerType;
		let str = '00:00:00';

		if (timerType == TimerType.Countdown) {
			if (state.paused) {
				// const dur = formatDuration({ seconds: state.duration / 1000 });
				// str = dur;
			} else {
			}
		} else if (timerType == TimerType.Stopwatch) {
		} else if (timerType == TimerType.Date) {
		} else {
		}

		return str;
	});
</script>

<div class="timerContainer {state.hidden ? 'hidden' : ''}">
	<span></span>
	<div class="timerText">{state.text.text}</div>
	<div class="timerBox">
		<span class="timerOverflow"></span>
		<span class="timer">
			{timerFormatted}
		</span>
	</div>
</div>

<style>
	.timerContainer {
		/* outline: solid; */
		height: 200px;
		width: 800px;

		display: grid;
		grid-template-rows: 1fr auto auto;
	}

	.hidden {
		display: none;
	}

	.timerText {
		color: #4a9eff;
		font-size: 54px;
		font-weight: 550;
		text-align: center;

		max-height: 100px;
	}

	.timerBox {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: center;
	}

	.timer {
		font-size: 64px;
		font-weight: 550;

		height: 100px;
		width: 320px;

		text-align: center;
	}

	.timerOverflow {
		position: absolute;

		left: 0;

		height: 100px;
		width: 240px;

		font-size: 64px;
		font-weight: 550;

		text-align: right;
		direction: rtl;

		overflow: hidden;
	}

	/* .timer > span {
		text-align: center;
	} */
</style>
