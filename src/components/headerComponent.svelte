<script lang="ts">
	import type { TextState } from '../state/app.svelte';

	let { state }: { state: TextState } = $props();
</script>

<div class="headerContainer">
	<div>{state.text}</div>
</div>

<style>
	.headerContainer {
		outline: solid;

		height: 200px;
		width: 800px;

		/* display: grid;
		grid-template-rows: 100px 100px; */
	}
</style>
