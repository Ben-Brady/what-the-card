import { useGame } from "@/hooks/useGame";
import { Card } from "@/lib/schema";
import CardElement from "./CardElement";
import ProgressBar from "./ProgressBar";

export const Game = (props: { cards: Card[] }) => {
    const cards = () => props.cards;
    const { card, progress, direction, goBack, goNext } = useGame(cards());

    return (
        <>
            <ProgressBar progress={progress} />
            <CardElement card={card} direction={direction} />
            <TapOverlay onNext={goNext} onBack={goBack} />
        </>
    );
};

const TapOverlay = (props: { onNext: () => void; onBack: () => void }) => (
    <>
        <div
            class="absolute left-0 top-0 bottom-0 z-10 w-1/2"
            onPointerUp={() => props.onBack()}
            onTouchEnd={() => props.onBack()}
            onTouchCancel={() => props.onBack()}
        />
        <div
            class="absolute right-0 top-0 bottom-0 z-10 w-1/2"
            onPointerUp={() => props.onNext()}
            onTouchEnd={() => props.onNext()}
            onTouchCancel={() => props.onNext()}
        />
    </>
);
