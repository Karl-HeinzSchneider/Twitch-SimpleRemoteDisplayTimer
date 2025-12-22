<script lang="ts">
	import type { TextState } from '../state/app.svelte';

	let { state }: { state: TextState } = $props();
</script>

<div class="headerContainer {state.hidden ? 'hidden' : ''}">
	<div class="text">{state.text}</div>
</div>

<style>
	.headerContainer {
		/* outline: solid; */

		height: 200px;
		width: 800px;

		/* display: grid;
		grid-template-rows: 100px 100px; */
	}

	.hidden {
		display: none;
	}

	.text {
		color: #4a9eff;
		font-size: 54px;
		font-weight: 550;
		text-align: center;

		/* max-height: 100px; */
	}
</style>
