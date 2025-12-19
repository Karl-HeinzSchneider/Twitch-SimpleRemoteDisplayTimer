import { page } from '$app/state';

export class UrlParamsState {
    params = $derived(page.url.searchParams);
    id = $derived(this.params.get('id'));
    channel = $derived(this.params.get('twitch'));
    channelValid = $derived.by(() => {
        const channelName = this.channel;

        if (!channelName || channelName === '') {
            return false;
        }

        return true;
    })
}

export const UrlParamsStore = new UrlParamsState();
