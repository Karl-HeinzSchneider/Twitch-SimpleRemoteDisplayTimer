import { parseISO } from 'date-fns';

// const tester = parseISO('00:10:42');

export function parseInputToDate(input: string | number | Date) {
    if (input instanceof Date) {
        return input;
    }
    if (typeof input === 'string') {
        if (parseISO(input).toString() !== 'Invalid Date') {
            return parseISO(input);
        }
    }

    return null;
}

console.log('now:', new Date())