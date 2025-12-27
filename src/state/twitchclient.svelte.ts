import * as tmi from "tmi.js";
import { UrlParamsStore } from "./urlparams.svelte";
import { AppStore, type TextState, type TimerState } from "./app.svelte";
import { parseInputToTimerUpdate } from "../helper/parseTimeString.svelte";
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

        if (first == ('!' + paramStore.displayPrefix)) {
            this.handleDisplayText(args);
            return;
        }

        if (first == ('!' + paramStore.smallPrefix)) {
            this.handleTimer(args, (u: Partial<TimerState>) => {
                appStore.updateSmallTimer(u)
            }, (u: Partial<TextState>) => {
                appStore.updateSmallTimerText(u)
            })
            return;
        }

        if (first == ('!' + paramStore.bigPrefix)) {
            this.handleTimer(args, (u: Partial<TimerState>) => {
                appStore.updateBigTimer(u)
            }, (u: Partial<TextState>) => {
                appStore.updateBigTimerText(u)
            })
            return;
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
            case 'color':
                {
                    appStore.updateHeaderText({ color: args[2] || 'white' })
                    break;
                }
            default:
                { break; }
        }
    }

    handleTimer(args: string[], updateFunc: (u: Partial<TimerState>) => void, updateTextFunc: (u: Partial<TextState>) => void) {
        // console.log("handleTimer", args)
        const fn = args[1].toLowerCase();
        console.log(fn)

        let update: Partial<TimerState> = {}

        switch (fn) {
            case 'show':
                {
                    update = { ...update, hidden: false }
                    break;
                }
            case 'hide':
                {
                    update = { ...update, hidden: true }
                    break;
                }
            case 'start':
                {
                    update = { ...update, paused: false }
                    break;
                }
            case 'stop':
                {
                    update = { ...update, paused: true }
                    break;
                }
            case 'set':
                {
                    update = parseInputToTimerUpdate(args[2])
                    const restArgString = args.slice(3).join(" ");
                    if (restArgString !== '') {
                        const textUpdate: Partial<TextState> = { text: restArgString }
                        updateTextFunc(textUpdate)
                    }
                    console.log(update)
                    break;
                }
            default:
                { break; }
        }

        updateFunc(update);
    }
}

export const TwitchClient = new TwitchClientState()