import { Accessor, ComponentProps } from "solid-js";
import classNames from "../../lib/classnames";

export type Card = {
    title: string;
    description: string;
    color: string;
};

export const Card = ({
    card,
    class: className,
    ...props
}: { card: Accessor<Card> } & ComponentProps<"div">) => (
    <div
        class={classNames(
            "size-full select-none text-black px-4",
            "flex items-center justify-center",
            className,
        )}
        {...props}
        style={{ background: card().color }}
    >
        <div class="flex flex-col gap-4 starting:opacity-0 opacity-100 duration-150">
            <div class="max-w-160 flex flex-col justify-end">
                <span class="text-center text-4xl h-fit">{card().title}</span>
            </div>
            <span class="text-center text-2xl max-w-160 h-32">{card().description}</span>
        </div>
    </div>
);
