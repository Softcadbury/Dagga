export function generateId() {
    return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
}

export function toFixedNumber(num: number): number {
    var pow = Math.pow(10, 2);
    return Math.round(num * pow) / pow;
}
