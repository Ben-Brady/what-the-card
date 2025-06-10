import { useAbortSignal } from "./useAbortSignal";

const THRESHOLD_FOR_MOVEMENT = 50;

export const useOnTap = (callback: (_: { x: number; y: number }) => void) => {
    const signal = useAbortSignal();

    let startingPos: [number, number] | undefined;

    const onPointerUp = (e: MouseEvent) => {
        if (!startingPos) return;
        const [startX, startY] = startingPos;
        const [endX, endY] = [e.clientX, e.clientY];
        const xMovement = Math.abs(startX - endX);
        const YMovement = Math.abs(startY - endY);
        const distance = Math.sqrt(xMovement ** 2 + YMovement ** 2);

        if (distance > THRESHOLD_FOR_MOVEMENT) return;
        const position = { x: endX, y: endY };
        callback(position);
    };

    const onPointerDown = (e: MouseEvent) => {
        startingPos = [e.clientX, e.clientY];
    };

    document.addEventListener("mouseup", onPointerUp, { signal });
    document.addEventListener("mousedown", onPointerDown, { signal });
};
