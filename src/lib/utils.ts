export const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

export const sum = (numbers: number[]) => numbers.reduce((total, value) => total + value, 0);

export function shuffle<T>(array: T[]): T[] {
    return array
        .map((value) => ({ value, score: Math.random() }))
        .sort((a, b) => a.score - b.score)
        .map((v) => v.value);
}

export const uuidv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16),
    );
};

export const transition = (callback: () => void): Promise<void> => {
    if ("startViewTransition" in document) {
        const transition = document.startViewTransition(callback);
        return transition.finished;
    } else {
        callback();
        return Promise.resolve();
    }
};
