<script lang="ts">
	import HeaderComponent from '../components/headerComponent.svelte';
	import TimerComponent from '../components/timerComponent.svelte';
	import { AppStore } from '../state/app.svelte';
	import { UrlParamsStore } from '../state/urlparams.svelte';

	const urlParams = UrlParamsStore;
	const store = AppStore;
</script>

<div class="container {urlParams.top ? 'top' : 'bottom'}">
	<span></span>
	<HeaderComponent state={store.state.header}></HeaderComponent>
	<TimerComponent state={store.state.smallTimer}></TimerComponent>
	<TimerComponent state={store.state.bigTimer}></TimerComponent>
	<span></span>
</div>

<style>
	.container {
		width: 800px;
		height: 400px;

		display: grid;
	}

	.bottom {
		grid-template-rows: 1fr auto auto auto auto;
	}
	.top {
		grid-template-rows: auto auto auto auto 1fr;
	}
</style>
