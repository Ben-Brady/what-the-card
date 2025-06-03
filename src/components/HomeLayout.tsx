import { createSignal, JSXElement } from "solid-js";
import { useBeforeLeave, useLocation } from "@solidjs/router";
import { transition } from "@/lib/transition";
import classNames from "@/lib/classnames";

const VERSION = "1.4.5";

const [direction, setDirection] = createSignal<"up" | "down" | "none">("none");

export default function HomeLayout(props: { children: JSXElement }) {
    const location = useLocation();
    const depth = () => getDepth(location.pathname);

    useBeforeLeave((e) => {
        if (typeof e.to !== "string") {
            e.preventDefault();
            transition(() => e.retry(true));
            return;
        }

        const fromDepth = getDepth(e.from.pathname);
        const toDepth = getDepth(e.to);

        if (fromDepth < toDepth) setDirection("down");
        if (fromDepth > toDepth) setDirection("up");

        e.preventDefault();
        transition(() => {
            e.retry(true);
        });
    });

    return (
        <div
            id="home-layout"
            class={classNames(
                "size-full flex justify-center overflow-y-auto",
                `depth-${depth()} transition-down`,
                {
                    "transition-up": direction() === "up",
                    "transition-down": direction() === "down",
                },
            )}
        >
            <div class="absolute bottom-0 right-1 text-neutral-600">{VERSION}</div>
            <div class="size-full max-w-160 p-8 relative flex flex-col items-center justify-between gap-4">
                {props.children}
            </div>
        </div>
    );
}

const depths: Record<string, number> = {
    "/": 1,
    "/play": 2,
    "/packs": 2,
    "/custom": 2,
    "/about": 2,
    "/about/changelog": 3,
    "/about/credits": 3,
    "/about/privacy": 3,
    "/about/tos": 3,
    "/about/gdpr": 3,
};
const getDepth = (pathname: string) => (pathname in depths ? depths[pathname] : 1);
