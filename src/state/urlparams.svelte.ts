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

    onlyModCanEdit: boolean = $derived.by(() => {
        const modValue = this.params.get('onlyMod')
        if (modValue && modValue === 'false') {
            return false;
        }
        else {
            return true; // default
        }
    })


    displayPrefix = $derived.by(() => {
        const displayValue = this.params.get('prefixDisplay')
        if (displayValue && displayValue != '') {
            return displayValue;
        }
        else {
            return 'display'; // default
        }
    })

    smallPrefix = $derived.by(() => {
        const smallValue = this.params.get('prefix')
        if (smallValue && smallValue != '') {
            return smallValue;
        }
        else {
            return 'timer'; // default
        }
    })

    bigPrefix = $derived.by(() => {
        const bigValue = this.params.get('prefix2')
        if (bigValue && bigValue != '') {
            return bigValue;
        }
        else {
            return 'bigtimer'; // default
        }
    })
}

export const UrlParamsStore = new UrlParamsState();
