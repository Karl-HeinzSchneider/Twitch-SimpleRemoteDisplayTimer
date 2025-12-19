import * as tmi from "tmi.js";
import { UrlParamsStore } from "./urlparams.svelte";
const paramStore = UrlParamsStore


export class TwitchClientState {
    clientInternal: null | tmi.Client = $state(null);
    client = $derived.by(() => {
        console.log('TwitchClientState.derivedBy', paramStore.channel, paramStore.channelValid)
        if (paramStore.channelValid) {
            if (this.clientInternal === null) {
                const clientOptions = { options: { debug: true }, channels: [paramStore.channel!] };
                this.clientInternal = new tmi.Client(clientOptions)

                this.clientInternal.addListener("message", this.handleChat);
                // this.clientInternal.connect().catch(console.error);
                try {
                    // this.clientInternal.connect()
                } catch (error) {
                    console.error(error)
                    this.clientInternal = null;
                }
            }
            return this.clientInternal
        }
        else {
            return null;
        }
    });

    handleChat(channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) {
        if (self) return;
        console.log('handlechat')
    }
}

export const TwitchClient = new TwitchClientState()