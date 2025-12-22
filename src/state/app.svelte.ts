export interface TextState {
    text: string,
    color: string,
    hidden: boolean
}
const defaultTextState: TextState = { text: 'headertext', color: 'white', hidden: false }

export enum TimerType {
    Countdown = 'countdown',
    Stopwatch = 'stopwatch',
    Date = 'date'
}

export interface TimerState {
    duration: number,
    start: number,
    end: number,
    timerType: TimerType
    paused: boolean,
    hidden: boolean
    text: TextState
}

const defaultTimerState = {
    duration: 0,
    start: 0,
    end: 0,
    timerType: TimerType.Countdown,
    paused: false,
    hidden: false,
    text: defaultTextState
}
const defaultBigTimerText: TextState = { ...defaultTextState, text: 'BigTimer' }
const defaultBigTimer: TimerState = { ...defaultTimerState, text: defaultBigTimerText }

const defaultSmallTimerText: TextState = { ...defaultTextState, text: 'SmallTimer' }
const defaultSmallTimer: TimerState = { ...defaultTimerState, text: defaultSmallTimerText }

export class AppState {
    state: { header: TextState, smallTimer: TimerState, bigTimer: TimerState } = $state({
        header: defaultTextState,
        smallTimer: defaultSmallTimer,
        bigTimer: defaultBigTimer
    })

    interval: NodeJS.Timeout;

    constructor() {
        this.interval = setInterval(() => {
            this.updateTimerState()
        }, 1000);
    }

    updateTimerState() {
        // const dateEpoch = Date.now();
        // console.log('updateTimerState', dateEpoch);


        this.state.smallTimer = updateTimer(this.state.smallTimer)
        this.state.bigTimer = updateTimer(this.state.bigTimer)
    }
}

function updateTimer(timer: TimerState): TimerState {
    if (timer.paused) {
        // paused => dont change anything
        return timer;
    }
    return timer;
}

export const AppStore = new AppState()