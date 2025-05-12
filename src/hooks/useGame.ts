import { Accessor, createSignal } from "solid-js";
import shuffle from "lodash/shuffle";
import { Card } from "../lib/pack";
import { clamp } from "../lib/utils";

export type ColoredCard = {
    title: string;
    description: string;
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
                    description: "This pack has not cards",
                    color: nextColor(),
                },
            ];
        }

        const shuffledCards = shuffle(cards);
        return shuffledCards.map(({ title, description }) => ({
            title,
            description,
            color: nextColor(),
        }));
    };

    const [index, setIndex] = createSignal<number>(0);
    const [deck, setCards] = createSignal<ColoredCard[]>(generateShuffledDeck());

    const card = () => deck()[index()];
    const progress = () => clamp((1 / cards.length) * index(), 0, 1);

    const goNext = () => {
        const newIndex = index() + 1;
        if (newIndex >= deck().length - 1) {
            setCards((cards) => [...cards, ...generateShuffledDeck()]);
        }

        setIndex(newIndex);
    };

    const goBack = () => {
        if (index() <= 0) return;
        setIndex((v) => v - 1);
    };

    return { card, progress, goBack, goNext };
};
