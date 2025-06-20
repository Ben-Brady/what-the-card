export const animate = ({
    signal,
    onFrame,
}: {
    signal: AbortSignal;
    onFrame: (deltaTime: number) => boolean;
}) => {
    let lastFrame = performance.now();

    const frame: FrameRequestCallback = (timestamp) => {
        const deltaTime = (timestamp - lastFrame) / 1000;
        lastFrame = timestamp;
        const shouldContinue = onFrame(deltaTime);
        if (!shouldContinue) return;
        
        frameId = requestAnimationFrame(frame);
    };
    let frameId = requestAnimationFrame(frame);

    signal.addEventListener("abort", () => {
        if (frameId) cancelAnimationFrame(frameId);
    });
};
