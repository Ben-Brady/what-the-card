import { JSXElement } from "solid-js";
import { useBeforeLeave } from "@solidjs/router";
import { transition } from "@/lib/transition";

const VERSION = "1.3.1";

export default function HomeLayout(props: { children: JSXElement; depth: "1" | "2" | "3" }) {
    useBeforeLeave((e) => {
        e.preventDefault();
        transition(() => e.retry(true));
    });

    return (
        <div
            style={{
                background:
                    props.depth === "1" ? "#99dfff" : props.depth === "2" ? "#7ad5ff" : "#23b9ff",
            }}
            class="size-full flex justify-center overflow-y-auto"
        >
            <div class="absolute bottom-0 right-1 text-neutral-600">{VERSION}</div>
            <div
                id="home-layout"
                class="size-full max-w-160 p-8 relative flex flex-col items-center justify-between gap-4"
            >
                {props.children}
            </div>
        </div>
    );
}
