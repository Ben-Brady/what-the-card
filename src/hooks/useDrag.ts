import { sum } from "@/lib/utils";
import { useAbortSignal } from "./useAbortSignal";

type Position = { x: number; y: number };
type DragHookOptions = {
    onDragStart: () => void;
    onDragEnd: ({ x, y }: Position) => void;
    onDragUpdate: ({ x, y }: Position) => void;
};

export const useDrag = (options: DragHookOptions) => {
    const signal = useAbortSignal();

    onDragMobile(options, signal);
    onDragDesktop(options, signal);
};

const onDragDesktop = (
    { onDragStart, onDragEnd, onDragUpdate }: DragHookOptions,
    signal: AbortSignal,
) => {
    let dragStart: undefined | Position = undefined;

    const onClickStart = (e: MouseEvent) => {
        dragStart = { x: e.screenX, y: e.screenY };
        onDragStart();
    };

    const onClickMove = (e: MouseEvent) => {
        if (dragStart === undefined) return;

        onDragUpdate({
            x: e.screenX - dragStart.x,
            y: e.screenY - dragStart.y,
        });
    };

    const onClickStop = (e: MouseEvent) => {
        if (dragStart === undefined) return;
        onDragEnd({
            x: e.screenX - dragStart.x,
            y: e.screenY - dragStart.y,
        });
        dragStart = undefined;
    };

    document.addEventListener("mousedown", onClickStart, { signal });
    document.addEventListener("mousemove", onClickMove, { signal });
    document.addEventListener("mouseup", onClickStop, { signal });
    // document.addEventListener("mouseout", onClickStop, { signal });
};

const onDragMobile = (
    { onDragStart, onDragEnd, onDragUpdate }: DragHookOptions,
    signal: AbortSignal,
) => {
    let touches: Record<number, Position> = {};
    let lastAverage: Position = { x: 0, y: 0 };

    const onTouchStart = (e: TouchEvent) => {
        if (Object.keys(touches).length === 0) {
            onDragStart();
        }

        for (const touch of e.touches) {
            touches[touch.identifier] = {
                x: touch.screenX,
                y: touch.screenY,
            };
        }
    };

    const onTouchMove = (e: TouchEvent) => {
        const offsets: Position[] = [];

        for (const touch of e.touches) {
            const identifier = touch.identifier;
            const start = touches[identifier];
            if (start === undefined) continue;

            const offset = {
                x: touch.screenX - start.x,
                y: touch.screenY - start.y,
            };
            offsets.push(offset);
        }

        const averageX = sum(offsets.map(({ x }) => x)) / offsets.length;
        const averageY = sum(offsets.map(({ y }) => y)) / offsets.length;
        const average = { x: averageX, y: averageY };

        lastAverage = average;
        onDragUpdate(average);
    };

    const onTouchRemove = (e: TouchEvent) => {
        if (e.touches.length !== 0) return;
        touches = {};
        onDragEnd(lastAverage);
        lastAverage = { x: 0, y: 0 };
    };

    document.body.addEventListener("touchstart", onTouchStart, { signal });
    document.body.addEventListener("touchmove", onTouchMove, { signal });
    document.body.addEventListener("touchcancel", onTouchRemove, { signal });
    document.body.addEventListener("touchend", onTouchRemove, { signal });
};
