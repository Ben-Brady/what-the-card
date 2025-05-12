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
    icon?: string;
}) {
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
            if (props.side === "right") x = -x;
            if (x < actiationWidth()) return;
            setTimeout(props.onSwipe, 200);
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
                    "w-32 rounded-[100%] absolute top-[-10vh] bottom-[-10vh]",
                    props.class,
                    props.side === "right" && "right-0 translate-x-full",
                    props.side === "left" && "left-0 -translate-x-full",
                )}
                style={{ transform: `scaleX(${stretch() ** 1.15}%)` }}
            />
            {/* <img
                class={classNames(
                    " text-white absolute top-1/2 -translate-y-1/2 z-40",
                    side === "right" && "-right-20",
                    side === "left" && "-left-20",
                )}
                style={{
                    transform:
                        side === "right"
                            ? `translateX(${stretch() * -1}px)`
                            : `translateX(${stretch()}px)`,
                }}
                src={icon}
            /> */}
        </div>
    );
}
