import { TimerType, type TimerState } from '../state/app.svelte';

const secondsRegex = /^(\d+)(?:s)?$/;
const minutesRegex = /^(\d+)(?:m|min)$/;
const hourRegex = /^(\d+)(?:h|hours)$/;
const dayRegex = /^(\d+)(?:d|day|days)$/;

export function parseInputToTimerUpdate(input: string): Partial<TimerState> {
    console.log('parseInputToTimerUpdate', input)

    let update: Partial<TimerState> = {
        timerType: TimerType.Countdown,
        duration: 0,
        start: 0,
        end: 0,
        paused: true,
    }

    const seconds = input.match(secondsRegex);
    if (seconds) {
        update = {
            ...update,
            timerType: TimerType.Countdown,
            duration: Number(seconds[1]) * 1000
        }
        return update;
    }


    const minutes = input.match(minutesRegex);
    if (minutes) {
        update = {
            ...update,
            timerType: TimerType.Countdown,
            duration: Number(minutes[1]) * 60 * 1000
        }
        return update;
    }

    const hours = input.match(hourRegex);
    if (hours) {
        update = {
            ...update,
            timerType: TimerType.Countdown,
            duration: Number(hours[1]) * 60 * 60 * 1000
        }
        return update;
    }

    const days = input.match(dayRegex);
    if (days) {
        update = {
            ...update,
            timerType: TimerType.Countdown,
            duration: Number(days[1]) * 24 * 60 * 60 * 1000
        }
        return update;
    }

    return update
}

console.log('now:', new Date())