import { Accessor, createSignal, onCleanup } from "solid-js";

type ScreenHook = {
    screenWidth: Accessor<number>;
    screenHeight: Accessor<number>;
};
export const useScreenSize = (): ScreenHook => {
    const [screenWidth, setScreenWidth] = createSignal(document.body.clientWidth);
    const [screenHeight, setScreenHeight] = createSignal(document.body.clientHeight);

    const observer = new ResizeObserver(() => {
        if (screenWidth() !== innerWidth) setScreenWidth(innerWidth);
        if (screenHeight() !== innerHeight) setScreenHeight(innerHeight);
    });
    observer.observe(document.body);
    onCleanup(() => observer.disconnect());

    return { screenWidth, screenHeight };
};
