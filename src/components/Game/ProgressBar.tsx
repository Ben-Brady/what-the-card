import { Accessor, Show } from "solid-js";

export default function ProgressBar(props: { progress: Accessor<number> }) {
    const progress = () => props.progress();

    return (
        <div
            class={
                "bg-blue-400 text-nowrap " +
                "h-8 w-full absolute top-0 z-20 " +
                "flex justify-center items-center origin-top-left"
            }
            style={{
                "view-transition-name": "progress-bar",
                "transition": "scale 300ms ease-out",
                "transform": `
                scaleX(${progress() * 100}%)
                scaleY(${progress() === 1 ? "100%" : "25%"})
                `,
            }}
        >
            <Show when={progress() === 1}>
                <span class="starting:opacity-0 opacity-100 delay-400 duration-500">
                    You've seen every card!
                </span>
            </Show>
        </div>
    );
}
