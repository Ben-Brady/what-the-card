import { Accessor, createSignal } from "solid-js";
import DragOverlay from "./DragOverlay/DragOverlay";
import shuffle from "lodash/shuffle";
import sample from "lodash/sample";
import { onTap } from "../hooks/onTap";

const pack = ["A", "B", "C", "D", "E"];

type Card = {
    text: string;
    color: string;
};

const generateShuffledDeck = (): Card[] => {
    const colors = ["#85E3FF", "#FFABAB", "#BFFCC6", "#DCD3FF", "#FF9CEE"] as const;

    let previousColor: string | undefined;
    const getColor = () => {
        const availableColors = colors.filter((color) => color !== previousColor);
        const color = sample(availableColors)!;
        previousColor = color;
        return color;
    };

    return shuffle(pack).map((text) => ({ text, color: getColor() }));
};

export const Game = () => {
    const [index, setIndex] = createSignal<number>(0);
    const [cards, setCards] = createSignal<Card[]>(generateShuffledDeck());

    const onBack = () => {
        if (index() <= 0) return;
        setIndex(index() - 1);
    };

    const onNext = () => {
        const newIndex = index() + 1;
        if (newIndex >= cards().length - 1) {
            setCards((cards) => [...cards, ...generateShuffledDeck()]);
        }
        setIndex(newIndex);
    };
    onTap(() => onNext());

    const card = () => cards()[index()];

    return (
        <>
            <div class="absolute inset-0 w-screen h-screen overflow-hidden">
                <DragOverlay side="left" className="bg-red-400" onSwipe={onBack} />
                <DragOverlay side="right" className="bg-green-400" onSwipe={onNext} />
            </div>

            <div class="w-screen h-screen bg-blue-300 contain-strict">
                <Card card={card} />
            </div>
        </>
    );
};

const Card = ({ card }: { card: Accessor<Card> }) => (
    <div
        class="size-full flex items-center justify-center select-none text-3xl text-black"
        style={{ background: card().color }}
    >
        {card().text}
    </div>
);
