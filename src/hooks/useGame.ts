import { Accessor, createSignal } from "solid-js";
import { Card } from "@/lib/pack";
import { clamp, shuffle } from "@/lib/utils";
import { transition } from "@/lib/transition";

export type ColoredCard = {
    title: string | undefined;
    text: string;
    color: string;
};

const createColorGenerator = () => {
    let hue = 0;
    const HUE_INCREMENT = 15;

    return () => {
        hue = (hue + HUE_INCREMENT) % 360;
        return `hwb(${hue}deg 50% 0%)`;
    };
};

export const defaultCardColor = "hwb(0deg 50% 0%)";

export type GameHook = {
    card: Accessor<ColoredCard>;
    progress: Accessor<number>;
    direction: Accessor<"backward" | "forward">;
    goBack: () => void;
    goNext: () => void;
};

export const useGame = (cards: Card[]) => {
    const nextColor = createColorGenerator();

    const generateShuffledDeck = (): ColoredCard[] => {
        // Prevent error on no cards
        if (cards.length === 0) {
            return [
                {
                    title: "Empty Pack",
                    text: "This pack has not cards",
                    color: nextColor(),
                },
            ];
        }

        const shuffledCards = shuffle(cards);
        return shuffledCards.map(({ title, text }) => ({
            title,
            text,
            color: nextColor(),
        }));
    };

    const [index, setIndex] = createSignal<number>(0);
    const [deck, setCards] = createSignal<ColoredCard[]>(generateShuffledDeck());
    const [direction, setDirection] = createSignal<"backward" | "forward">("forward");

    const card = () => deck()[index()];
    const progress = () => clamp((1 / cards.length) * index(), 0, 1);

    const goNext = () => {
        setDirection("forward");
        const newIndex = index() + 1;
        const cards = deck();

        transition(() => {
            if (newIndex >= cards.length - 1) {
                setCards((cards) => [...cards, ...generateShuffledDeck()]);
            }

            setIndex(newIndex);
        });
    };

    const goBack = () => {
        if (index() <= 0) return;
        setDirection("backward");
        transition(() => {
            setIndex((v) => v - 1);
        });
    };

    return { card, progress, direction, goBack, goNext };
};
