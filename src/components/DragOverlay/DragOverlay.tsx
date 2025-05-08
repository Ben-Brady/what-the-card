import { createSignal } from "solid-js";
import { useDrag } from "../../hooks/useDrag.ts";
import { clamp } from "../../lib/utils.ts";
import { useAnimate } from "../../hooks/useAnimate.ts";
import { useScreenSize } from "../../hooks/useScreenSize.ts";
import classNames from "../../lib/classnames.ts";

export default function DragOverlay({
    onSwipe,
    side,
    className,
}: {
    onSwipe: () => void;
    side: "left" | "right";
    className: string;
}) {
    const isRight = side === "right";
    const [stretch, setStretch] = createSignal(0);
    const [isDragging, setIsDragging] = createSignal<boolean>(false);

    const { screenWidth } = useScreenSize();

    useAnimate({
        shouldRun() {
            return !isDragging() && stretch() > 0;
        },
        onFrame(delta) {
            const rate = Math.max(stretch() * 20, 10);
            const reduction = rate * delta;
            setStretch(Math.max(stretch() - reduction, 0));
        },
    });

    const maxWidth = () => clamp(screenWidth() / 4, 0, 150);
    const actiationWidth = () => maxWidth() * 0.8;

    useDrag({
        onDragStart: () => setIsDragging(true),
        onDragEnd: ({ x }) => {
            setIsDragging(false);
            if (isRight) x = -x;
            if (x < actiationWidth()) return;
            setTimeout(onSwipe, 200);
        },
        onDragUpdate: ({ x }) => {
            if (isRight) x = -x;
            const stretch = clamp(x, 0, maxWidth());
            setStretch(stretch);
        },
    });

    return (
        <div
            class={classNames(
                "w-32 absolute top-0 rounded-[100%] h-[120vh] -translate-y-[10vh] z-40",
                className,
                side === "right" && "right-0 translate-x-full",
                side === "left" && "left-0 -translate-x-full",
            )}
            style={{ transform: `scaleX(${stretch() * 2}%)` }}
        />
    );
}
