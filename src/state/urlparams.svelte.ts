import { page } from '$app/state';

export class UrlParamsState {
    params = $derived(page.url.searchParams);
    id = $derived(this.params.get('id'));
    channel: string | null = $derived(this.params.get('twitch'));
    channelValid: boolean = $derived.by(() => {
        const channelName = this.channel;

        if (!channelName || channelName === '') {
            return false;
        }

        return true;
    })
    top: boolean = $derived.by(() => {
        const topValue = this.params.get('top')
        if (topValue && topValue === 'true') {
            return true;
        }
        else {
            return false;
        }
    })
}

export const UrlParamsStore = new UrlParamsState();
