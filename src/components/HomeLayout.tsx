import { createSignal, JSXElement } from "solid-js";
import { useBeforeLeave, useLocation } from "@solidjs/router";
import { transition } from "@/lib/transition";
import classNames from "@/lib/classnames";
import { VERSION } from "@/pages/about/changelog";

const [direction, setDirection] = createSignal<"up" | "down" | "none">("none");

export default function HomeLayout(props: { children: JSXElement }) {
    const location = useLocation();
    const depth = () => getDepth(location.pathname);

    useBeforeLeave((e) => {
        if (typeof e.to !== "string") {
            setDirection("none");
        } else {
            const fromDepth = getDepth(e.from.pathname);
            const toDepth = getDepth(e.to);
            setDirection(fromDepth < toDepth ? "down" : "up");
        }

        e.preventDefault();
        transition(() => e.retry(true));
    });

    return (
        <>
            <div class={`size-full flex justify-center overflow-y-auto depth-${depth()}`}>
                <div class="absolute bottom-0 left-0 px-2  text-neutral-600">Ben Brady</div>
                <div class="absolute bottom-0 right-0 px-2 text-neutral-600">{VERSION}</div>
                <div
                    id="home-layout"
                    class={classNames(
                        "size-full max-w-160 p-8 relative",
                        "flex flex-col items-center justify-between gap-4",
                        direction() === "up" && "transition-up",
                        direction() === "down" && "transition-down",
                    )}
                >
                    {props.children}
                </div>
            </div>
        </>
    );
}

const depths: Record<string, number> = {
    "/": 1,
    "/play": 2,
    "/packs": 2,
    "/cards": 2,
    "/about": 2,
    "/about/changelog": 3,
    "/about/credits": 3,
    "/about/privacy": 3,
    "/about/tos": 3,
    "/about/gdpr": 3,
};
const getDepth = (pathname: string) => (pathname in depths ? depths[pathname] : 1);
