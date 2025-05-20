import { useAbortSignal } from "./useAbortSignal";
import { Accessor, createSignal } from "solid-js";

export const useHolding = (): Accessor<boolean> => {
    const [holding, setHolding] = createSignal(false);
    const signal = useAbortSignal();

    const onTouchEvent = (e: TouchEvent) => setHolding(e.touches.length > 0);
    addEventListener(signal, "touchstart", onTouchEvent);
    addEventListener(signal, "touchmove", onTouchEvent);
    addEventListener(signal, "touchcancel", onTouchEvent);
    addEventListener(signal, "touchend", onTouchEvent);

    addEventListener(signal, "mousedown", () => setHolding(true));
    addEventListener(signal, "mouseup", () => setHolding(false));

    return holding;
};

const addEventListener = <K extends keyof DocumentEventMap>(
    signal: AbortSignal,
    type: K,
    listener: (ev: DocumentEventMap[K]) => void,
) => {
    document.addEventListener(type, listener, { signal });
};
