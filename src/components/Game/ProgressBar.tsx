import { Accessor, Show } from "solid-js";
import classNames from "../../lib/classnames";

export default function ProgressBar({ progress }: { progress: Accessor<number> }) {
    return (
        <div
            class={classNames(
                "h-2 bg-blue-400 absolute top-0 left-0 z-20",
                "flex justify-center items-center text-nowrap select-none",
            )}
            style={{
                transition: "width 300ms ease-out, height 200ms ease-out 200ms",
                width: `${progress() * 100}%`,
                height: progress() === 1 ? "2rem" : undefined,
            }}
        >
            <Show when={progress() === 1}>
                <span class="starting:opacity-0 opacity-100 delay-350 duration-500">
                    You've seen every card!
                </span>
            </Show>
        </div>
    );
};
