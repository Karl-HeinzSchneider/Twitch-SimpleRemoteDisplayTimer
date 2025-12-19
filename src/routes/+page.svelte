<script lang="ts">
	import { TwitchClient } from '../state/twitchclient.svelte';
	import { UrlParamsStore } from '../state/urlparams.svelte';
	import Widget from './widget.svelte';

	let dockMode = false;

	const urlParams = UrlParamsStore;
	const client = TwitchClient.client;
</script>

<div class="div">
	params?: {urlParams.params}
</div>
<div class="div">
	id?: {urlParams.id}
</div>
<div class="div">
	channel?: {urlParams.channel}
</div>

<div class="div">
	channelValid?: {urlParams.channelValid}
</div>

{#if !urlParams.channelValid}
	<h2>Channel url parameter missing!</h2>
	<div>Please add '?twitch=exampleTwitchChannel' to the URL</div>
{:else}
	{#if client != null}
		<div>CLIENT</div>
	{:else}
		<div>NO CLIENT</div>
	{/if}

	<Widget></Widget>
{/if}

<style></style>
