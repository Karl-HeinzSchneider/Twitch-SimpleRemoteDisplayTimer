import * as tmi from "tmi.js";
import { UrlParamsStore } from "./urlparams.svelte";
import { AppStore } from "./app.svelte";
const paramStore = UrlParamsStore
const appStore = AppStore;

export class TwitchClientState {
    clientInternal: null | tmi.Client = $state(null);
    client = $derived.by(() => {
        console.log('TwitchClientState.derivedBy', paramStore.channel, paramStore.channelValid)
        if (paramStore.channelValid) {
            if (this.clientInternal === null) {
                const clientOptions = { options: { debug: true }, channels: [paramStore.channel!] };
                this.clientInternal = new tmi.Client(clientOptions)

                this.clientInternal.addListener("message", this.handleChat.bind(this));
                // this.clientInternal.connect().catch(console.error);
                try {
                    this.clientInternal.connect()
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

    constructor() {
        // this.AppStore = AppStore;
        console.log(appStore != null)
    }

    handleChat(channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) {
        if (self) return;
        // console.log(channel, userstate, message, self);

        const isMod = userstate.mod;
        const badges = userstate.badges || {};
        const isBroadcaster = badges.broadcaster == "1";
        const hasEditPermissions = isMod || isBroadcaster;

        // console.log(isMod, isBroadcaster, hasEditPermissions);
        // console.log("~> hasEditPermissions?", hasEditPermissions);

        const messageFixed = message.trim();
        const args = messageFixed
            .split(" ")
            .map((x) => x.trim())
            .filter((x) => x != "");
        console.log(args);

        if (!args[0] || args[0] == "") {
            console.log("No args");
            return;
        }

        const first = args[0].toLowerCase()

        const prefixArray = [paramStore.displayPrefix, paramStore.smallPrefix, paramStore.bigPrefix].map(x => '!' + x)
        console.log(prefixArray)

        if (!(prefixArray.includes(first))) {
            console.log("~~>> NO PREFIX");
            return;
        }

        if (paramStore.onlyModCanEdit && !hasEditPermissions) {
            console.log("no edit permission");
            return;
        }

        this.handleArgs(args);
    }

    handleArgs(args: string[]) {
        console.log("handleArgs:", args);

        const first = args[0].toLowerCase()
        // const fn = args[1];
        // console.log(fn)

        if (first == '!' + paramStore.displayPrefix) {
            this.handleDisplayText(args);
        }
    }

    handleDisplayText(args: string[]) {
        // console.log("handleDisplayText", args)
        const fn = args[1];
        // console.log(fn)

        switch (fn) {
            case 'show':
                {
                    appStore.updateHeaderText({ hidden: false })
                    break;
                }
            case 'hide':
                {
                    appStore.updateHeaderText({ hidden: true })
                    break;
                }
            case 'set':
                {
                    const restArgString = args.slice(2).join(" ");
                    appStore.updateHeaderText({ text: restArgString })
                    break;
                }
            default:
                break;
        }
    }

}

export const TwitchClient = new TwitchClientState()