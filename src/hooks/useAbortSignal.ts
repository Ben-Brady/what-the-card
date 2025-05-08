import { onCleanup } from "solid-js";

export const useAbortSignal = (): AbortSignal => {
    const controlller = new AbortController();
    const signal = controlller.signal;
    onCleanup(() => controlller.abort());
    return signal;
};
