import { For, JSX } from "solid-js";
import { Card } from "@/lib/pack";
import { calculateMasonryColumns } from "@/lib/masonary";

const CardsColumm = (props: {
    cards: Card[];
    component: (props: { card: Card }) => JSX.Element;
}) => {
    const columns = () =>
        calculateMasonryColumns({
            columnCount: 2,
            items: props.cards,
            calculateHeight: (card) => {
                const GAP = 16;
                const PADDING = 32;
                const LINE_HEIGHT = 16;

                const titleLines = !card.title ? 0 : Math.ceil(card.title.length / 20);
                const textLines = Math.ceil(card.text.length / 26);
                return titleLines * LINE_HEIGHT + textLines * LINE_HEIGHT + GAP + PADDING;
            },
        });

    return (
        <>
            {/* Single column */}
            <div class="size-full gap-4 overflow-y-auto px-1 xs:hidden flex-col flex">
                <For each={props.cards}>{(card) => <props.component card={card} />}</For>
            </div>
            {/* Dual columns */}
            <div class="size-full gap-4 overflow-y-auto px-1 hidden xs:flex">
                <For each={columns()}>
                    {(column) => (
                        <div class="flex flex-col gap-4 w-full">
                            <For each={column}>{(card) => <props.component card={card} />}</For>
                        </div>
                    )}
                </For>
            </div>
        </>
    );
};

export default CardsColumm;
