import { onCleanup } from "solid-js";
import "../styles/tap.css";

const THRESHOLD_FOR_MOVEMENT = 50;

export const onTap = (callback: (_: { x: number; y: number }) => void) => {
    const controller = new AbortController();
    const signal = controller.signal;

    let startingPos: [number, number] | undefined;
    document.addEventListener(
        "pointerdown",
        (e) => {
            startingPos = [e.clientX, e.clientY];
        },
        { signal },
    );

    document.addEventListener(
        "pointerup",
        (e) => {
            if (!startingPos) return;
            const [startX, startY] = startingPos;
            const [endX, endY] = [e.clientX, e.clientY];
            const xMovement = Math.abs(startX - endX);
            const YMovement = Math.abs(startY - endY);
            const distance = Math.sqrt(xMovement ** 2 + YMovement ** 2);

            if (distance > THRESHOLD_FOR_MOVEMENT) return;
            const position = { x: endX, y: endY };
            createTapElement(position);
            callback(position);
        },
        { signal },
    );

    const createTapElement = ({ x, y }: { x: number; y: number }) => {
        const div = document.createElement("div");
        div.className =
            "animate-tap-circle rounded-full bg-white z-50 absolute size-12 outline-1 outline-transparent -translate-1/2";
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.style.transform = `translate(-50%, -50%)`;

        div.onanimationend = () => div.remove();
        document.body.appendChild(div);
    };

    onCleanup(() => controller.abort());

    return <></>;
};
