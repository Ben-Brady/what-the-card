import { Accessor, Show } from "solid-js";
import classNames from "@/lib/classnames";
import { ColoredCard } from "@/hooks/useGame";

type CardElementProps = {
    card: Accessor<ColoredCard>;
    direction: Accessor<"backward" | "forward">;
};

export default function CardElement(props: CardElementProps) {
    const card = () => props.card();

    return (
        <div
            class={classNames(
                "size-full text-black px-4",
                "flex items-center justify-center",
                props.direction() === "forward" && "card-forward",
                props.direction() === "backward" && "card-backward",
            )}
            style={{ background: card().color }}
        >
            <div class="flex flex-col gap-4 starting:opacity-0 opacity-100 duration-150">
                <Show when={card().title}>
                    <div class="max-w-160 flex flex-col justify-end">
                        <span class="text-center text-4xl h-fit">{card().title}</span>
                    </div>
                    <span class="text-center text-2xl max-w-160 h-32 whitespace-pre-line">
                        {card().text}
                    </span>
                </Show>
                <Show when={!card().title}>
                    <span class="text-center text-2xl max-w-160 h-fit whitespace-pre-line">
                        {card().text}
                    </span>
                </Show>
            </div>
        </div>
    );
}
