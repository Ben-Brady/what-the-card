import { Accessor, onCleanup } from "solid-js";

export const useAnimate = ({
    shouldRun,
    onFrame,
}: {
    shouldRun: Accessor<boolean>;
    onFrame: (deltaTime: number) => void;
}) => {
    let frameId: number | undefined;
    let lastFrame = performance.now();

    const frame: FrameRequestCallback = (timestamp) => {
        const deltaTime = (timestamp - lastFrame) / 1000;
        lastFrame = timestamp;
        if (shouldRun()) onFrame(deltaTime);
        frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);

    onCleanup(() => {
        if (frameId) cancelAnimationFrame(frameId);
    });
};
