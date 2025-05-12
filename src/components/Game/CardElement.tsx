import { Accessor, ComponentProps, Show } from "solid-js";
import classNames from "@/lib/classnames";
import { ColoredCard } from "@/hooks/useGame";

export default function CardElement(
    props: { card: Accessor<ColoredCard> } & ComponentProps<"div">,
) {
    const card = () => props.card();

    return (
        <div
            {...props}
            class={classNames(
                "size-full text-black px-4",
                "flex items-center justify-center",
                props.class,
            )}
            style={{ background: card().color }}
        >
            <div class="flex flex-col gap-4 starting:opacity-0 opacity-100 duration-150">
                <Show when={card().title}>
                    <div class="max-w-160 flex flex-col justify-end">
                        <span class="text-center text-4xl h-fit">{card().title}</span>
                    </div>
                    <span class="text-center text-2xl max-w-160 h-32 whitespace-pre-line">
                        {card().description}
                    </span>
                </Show>
                <Show when={!card().title}>
                    <span class="text-center text-2xl max-w-160 h-fit whitespace-pre-line">
                        {card().description}
                    </span>
                </Show>
            </div>
        </div>
    );
}
