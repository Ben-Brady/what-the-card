import { onCleanup } from "solid-js";

export const useDrag = ({
    onDragStart,
    onDragEnd,
    onDragUpdate,
}: {
    onDragStart: () => void;
    onDragEnd: ({ x, y }: { x: number; y: number }) => void;
    onDragUpdate: ({ x, y }: { x: number; y: number }) => void;
}) => {
    const controlller = new AbortController();
    const signal = controlller.signal;
    onCleanup(() => controlller.abort());

    let dragStart: undefined | { x: number; y: number } = undefined;

    document.body.addEventListener(
        "pointerdown",
        (e) => {
            dragStart = { x: e.clientX, y: e.clientY };
            onDragStart();
        },
        { signal },
    );

    document.body.addEventListener(
        "mousemove",
        (e) => {
            if (dragStart === undefined) return;

            onDragUpdate({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        },
        { signal },
    );

    document.body.addEventListener("pointerup", (e) => {
        if (dragStart === undefined) return;

        onDragEnd({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
        dragStart = undefined;
    });

    document.addEventListener("pointerout", (e) => {
        if (dragStart === undefined) return;

        onDragEnd({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
        dragStart = undefined;
    });
};
