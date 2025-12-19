export interface TextState {
    text: string,
    color: string,
    hidden: boolean
}
const defaultTextState: TextState = { text: 'headertext', color: 'white', hidden: false }

export interface TimerState {
    timer: string
    hidden: boolean
    text: TextState
}

const defaultTimerState = {
    timer: '',
    hidden: false,
    text: defaultTextState
}
const defaultBigTimerText: TextState = { ...defaultTextState, text: 'BigTimer' }
const defaultBigTimer = { ...defaultTimerState, text: defaultBigTimerText }

const defaultSmallTimerText: TextState = { ...defaultTextState, text: 'SmallTimer' }
const defaultSmallTimer = { ...defaultTimerState, text: defaultSmallTimerText }

export class AppState {
    state: { header: TextState, smallTimer: TimerState, bigTimer: TimerState } = $state({ header: defaultTextState, smallTimer: defaultSmallTimer, bigTimer: defaultBigTimer })

    constructor() {

    }
}

export const AppStore = new AppState()