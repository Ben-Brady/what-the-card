export const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

export const sum = (numbers: number[]) => numbers.reduce((total, value) => total + value, 0);

export function shuffle<T>(array: T[]): T[] {
    return array
        .map((value) => ({ value, score: Math.random() }))
        .sort((a, b) => a.score - b.score)
        .map((v) => v.value);
}
