import "./Game.css";
import { Show } from "solid-js";
import { useGame } from "@/hooks/useGame";
import { Card } from "@/lib/pack";
import CardElement from "./CardElement";
import ProgressBar from "./ProgressBar";
import { useHolding } from "@/hooks/useHolding";
import classNames from "@/lib/classnames";

export const Game = (props: { cards: Card[] }) => {
    const cards = () => props.cards;
    const { card, progress, direction, goBack, goNext } = useGame(cards());

    const isFirst = () => progress() === 0;

    return (
        <>
            <ProgressBar progress={progress} />
            <TapOverlay onNext={goNext} onBack={isFirst() ? undefined : goBack} />

            <div class="absolute inset-0 bg-blue-300 contain-strict">
                <CardElement card={card} direction={direction} />
            </div>
        </>
    );
};

const TapOverlay = (props: { onNext: () => void; onBack?: () => void }) => {
    const isHolding = useHolding();

    return (
        <div
            class={classNames(
                "absolute inset-0 contain-strict z-10 duration-75",
                isHolding() ? "opacity-20" : "opacity-0",
            )}
        >
            <Show when={props.onBack}>
                <div
                    class="absolute w-1/3 left-0 top-0 bottom-0 bg-red-500"
                    onPointerUp={() => props.onBack?.()}
                    onTouchEnd={() => props.onBack?.()}
                    onTouchCancel={() => props.onBack?.()}
                />
            </Show>
            <div
                class="absolute w-1/3 right-0 top-0 bottom-0 bg-green-500"
                onPointerUp={() => props.onNext()}
                onTouchEnd={() => props.onNext()}
                onTouchCancel={() => props.onNext()}
            />
        </div>
    );
};
