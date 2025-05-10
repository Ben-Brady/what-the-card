import { Accessor, createSignal } from "solid-js";
import shuffle from "lodash/shuffle";
import { Pack } from "../lib/pack";
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

export const useGame = (pack: Pack) => {
    const nextColor = createColorGenerator();
    const generateShuffledDeck = (): ColoredCard[] => {
        // Prevent error on no cards
        if (pack.cards.length === 0) {
            return [
                {
                    title: "Empty Pack",
                    description: "This pack has not cards",
                    color: nextColor(),
                },
            ];
        }

        const shuffledCards = shuffle(pack.cards);
        return shuffledCards.map(({ title, description }) => ({
            title,
            description,
            color: nextColor(),
        }));
    };

    const [index, setIndex] = createSignal<number>(0);
    const [cards, setCards] = createSignal<ColoredCard[]>(generateShuffledDeck());

    const card = () => cards()[index()];
    const progress = () => clamp((1 / pack.cards.length) * index(), 0, 1);

    const goBack = () => {
        if (index() <= 0) return;
        setIndex((v) => v - 1);
    };

    const goNext = () => {
        const newIndex = index() + 1;
        if (newIndex >= cards().length - 1) {
            setCards((cards) => [...cards, ...generateShuffledDeck()]);
        }

        setIndex(newIndex);
    };

    return { card, progress, goBack, goNext };
};
