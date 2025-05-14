import { createSignal } from "solid-js";
import { useDrag } from "@/hooks/useDrag.ts";
import { clamp } from "@/lib/utils.ts";
import { useAnimate } from "@/hooks/useAnimate.ts";
import { useScreenSize } from "@/hooks/useScreenSize.ts";
import classNames from "@/lib/classnames.ts";

export default function DragOverlay(props: {
    onSwipe: () => void;
    side: "left" | "right";
    class: string;
}) {
    const [stretch, setStretch] = createSignal(0);
    const [isDragging, setIsDragging] = createSignal<boolean>(false);

    const { screenWidth } = useScreenSize();

    useAnimate({
        shouldRun() {
            return !isDragging() && stretch() > 0;
        },
        onFrame(delta) {
            const rate = Math.max((stretch() - stretch() / 2) * 10, 10);

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
            if (props.side === "right") x = -x;
            if (x < actiationWidth()) return;
            setTimeout(props.onSwipe);
        },
        onDragUpdate: ({ x }) => {
            if (props.side === "right") x = -x;
            const stretch = clamp(x, 0, maxWidth());
            setStretch(stretch);
        },
    });

    return (
        <div class="fixed inset-0 overflow-hidden z-40">
            <div
                class={classNames(
                    "w-32 rounded-[100%] absolute top-0 bottom-0 opacity-80",
                    props.class,
                    props.side === "right" && "right-0 translate-x-full",
                    props.side === "left" && "left-0 -translate-x-full",
                )}
                style={{ transform: `scaleX(${stretch() ** 1.25}%)  blur(1px) ` }}
            />
            <div
                class={classNames(
                    "w-32 rounded-[100%] absolute top-0 bottom-0 opacity-80",
                    props.class,
                    props.side === "right" && "right-0 translate-x-full",
                    props.side === "left" && "left-0 -translate-x-full",
                )}
                style={{
                    transform: `scaleX(${stretch() ** 1.2}%)`,
                    filter: "brightness(0.90) blur(.25rem)",
                }}
            />
            <div
                class={classNames(
                    "w-32 rounded-[100%] absolute top-0 bottom-0 opacity-80",
                    props.class,
                    props.side === "right" && "right-0 translate-x-full",
                    props.side === "left" && "left-0 -translate-x-full",
                )}
                style={{
                    transform: `scaleX(${stretch() ** 1.15}%)`,
                    filter: "brightness(0.85)  blur(.25rem)",
                }}
            />
        </div>
    );
}
