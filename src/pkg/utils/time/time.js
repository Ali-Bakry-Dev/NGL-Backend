export function toMs(value, unit) {
    const units = {
        ms: 1,
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        days: 24 * 60 * 60 * 1000
    };

    if (!units[unit]) {
        throw new Error("Invalid time unit");
    }

    return value * units[unit];
}

export function toSeconds(value, unit) {
    return toMs(value, unit) / 1000;
}
