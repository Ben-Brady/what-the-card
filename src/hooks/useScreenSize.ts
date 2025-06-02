import { createSignal } from "solid-js";

export const useScreenWidth = () => {
    const [width, setWidth] = createSignal<number>(document.body.clientWidth);

    const oberserver = new ResizeObserver(() => {
        setWidth(document.body.clientWidth);
    });
    oberserver.observe(document.body);

    return width;
};
