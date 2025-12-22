<script lang="ts">
	import { TwitchClient } from '../state/twitchclient.svelte';
	import { UrlParamsStore } from '../state/urlparams.svelte';
	import Widget from './widget.svelte';

	let dockMode = false;

	const urlParams = UrlParamsStore;
	const client = TwitchClient.client;
</script>

{#if !urlParams.channelValid}
	<h2>Channel url parameter missing!</h2>
	<div>Please add '?twitch=exampleTwitchChannel' to the URL</div>
{:else}
	{#if client}
		<div>client</div>
	{/if}
	<Widget></Widget>
{/if}

<style>
	:global(body) {
		background-color: #1a1a1a;
		color: white;
		font-family: 'Roboto Mono', monospace;
	}
</style>
