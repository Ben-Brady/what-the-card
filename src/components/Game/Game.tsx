import { createSignal } from "solid-js";
import { Show } from "solid-js/web";
import DragOverlay from "../DragOverlay/DragOverlay";
import shuffle from "lodash/shuffle";
import BackImage from "../../assets/back.svg";
import { useOnTap } from "../../hooks/useOnTap";
import { Pack } from "../../lib/pack";
import { clamp } from "../../lib/utils";
import { Card } from "./Card";
import ProgressBar from "./ProgressBar";

let hue = 0;

export const firstCardColor = "hwb(0deg 50% 0%)";

const getColor = (): string => {
    const INCREMENT = 15;
    hue = (hue + INCREMENT) % 360;
    return `hwb(${hue}deg 50% 0%)`;
};

const generateShuffledDeck = (pack: Pack): Card[] => {
    const shuffledCards = shuffle(pack.cards);
    return shuffledCards.map(({ title, description }) => ({
        title,
        description,
        color: getColor(),
    }));
};

export const Game = ({ pack }: { pack: Pack }) => {
    hue = 0;
    const [index, setIndex] = createSignal<number>(0);
    const [cards, setCards] = createSignal<Card[]>(generateShuffledDeck(pack));

    const onBack = () => {
        if (index() <= 0) return;
        setIndex((v) => v - 1);
    };

    const onNext = () => {
        const newIndex = index() + 1;
        if (newIndex >= cards().length - 1) {
            setCards((cards) => [...cards, ...generateShuffledDeck(pack)]);
        }

        setIndex(newIndex);
    };
    useOnTap(() => onNext());

    const card = () => cards()[index()];
    const progress = () => clamp((1 / pack.cards.length) * index(), 0, 1);

    return (
        <>
            <Show when={index() !== 0}>
                <DragOverlay side="left" icon={BackImage} className="bg-rose-400" onSwipe={onBack} />
                <DragOverlay
                    side="right"
                    icon={BackImage}
                    className="bg-red-400"
                    onSwipe={onBack}
                />
            </Show>
            <ProgressBar progress={progress} />

            <div class="absolute inset-0 bg-blue-300 contain-strict">
                <Card card={card} />
            </div>
        </>
    );
};
