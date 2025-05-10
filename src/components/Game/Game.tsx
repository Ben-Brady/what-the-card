import { Show } from "solid-js/web";
import DragOverlay from "../DragOverlay/DragOverlay";
import BackImage from "../../assets/back.svg";
import { useOnTap } from "../../hooks/useOnTap";
import { Pack } from "../../lib/pack";
import { Card } from "./Card";
import ProgressBar from "./ProgressBar";
import { useGame } from "../../hooks/useGame";

export const Game = ({ pack }: { pack: Pack }) => {
    const { card, progress, goBack, goNext } = useGame(pack);

    useOnTap(goNext);

    return (
        <>
            <Show when={progress() !== 0}>
                <DragOverlay
                    side="left"
                    icon={BackImage}
                    className="bg-rose-400"
                    onSwipe={goBack}
                />
                <DragOverlay
                    side="right"
                    icon={BackImage}
                    className="bg-red-400"
                    onSwipe={goBack}
                />
            </Show>
            <ProgressBar progress={progress} />

            <div class="absolute inset-0 bg-blue-300 contain-strict">
                <Card card={card} />
            </div>
        </>
    );
};
