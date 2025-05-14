import "./Game.css";
import { useOnTap } from "@/hooks/useOnTap";
import { useGame } from "@/hooks/useGame";
import { Card } from "@/lib/pack";
import DragOverlay from "@/components/DragOverlay/DragOverlay";
import CardElement from "./CardElement";
import ProgressBar from "./ProgressBar";

const transition = (callback: () => void) => {
    if ("startViewTransition" in document) {
        document.startViewTransition(callback);
    } else {
        callback();
    }
};

export const Game = (props: { cards: Card[] }) => {
    const cards = () => props.cards;
    const { card, progress, goBack, goNext } = useGame(cards());

    useOnTap(() => transition(goNext));

    return (
        <>
            <DragOverlay side="left" class="bg-red-400" onSwipe={() => transition(goBack)} />
            <DragOverlay side="right" class="bg-red-400" onSwipe={() => transition(goBack)} />
            <ProgressBar progress={progress} />

            <div class="absolute inset-0 bg-blue-300 contain-strict">
                <CardElement card={card} />
            </div>
        </>
    );
};
