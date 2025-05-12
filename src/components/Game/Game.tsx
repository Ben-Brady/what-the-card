import DragOverlay from "../DragOverlay/DragOverlay";
import BackImage from "@/assets/back.svg";
import { useOnTap } from "@/hooks/useOnTap";
import { Pack } from "@/lib/pack";
import { Card } from "./Card";
import ProgressBar from "./ProgressBar";
import { useGame } from "@/hooks/useGame";

export const Game = (props: { pack: Pack }) => {
    const pack = () => props.pack;
    const { card, progress, goBack, goNext } = useGame(pack());

    useOnTap(goNext);

    return (
        <>
            <DragOverlay side="left" icon={BackImage} class="bg-rose-400" onSwipe={goBack} />
            <DragOverlay side="right" icon={BackImage} class="bg-red-400" onSwipe={goBack} />
            <ProgressBar progress={progress} />

            <div class="absolute inset-0 bg-blue-300 contain-strict">
                <Card card={card} />
            </div>
        </>
    );
};
