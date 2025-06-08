import { LinkButton } from "@/components/Elements";
import CardsColumm from "./CardColumns";
import { cards } from "@/assets/cards";
import CardComponent from "./CardComponent";
import { disableBuiltinCard, disabledIds, enableBuiltinCard } from "@/lib/enabled";
import classNames from "@/lib/classnames";

const BuiltinCards = () => {
    return (
        <>
            <span class="text-2xl text-neutral-900 text-center">Tap on cards to disable them</span>
            <CardsColumm
                cards={cards}
                component={(props) => {
                    const isDisabled = () => disabledIds().includes(props.card.id);
                    const onClick = () => {
                        if (isDisabled()) {
                            enableBuiltinCard(props.card);
                        } else {
                            disableBuiltinCard(props.card);
                        }
                    };

                    return (
                        <CardComponent
                            card={props.card}
                            onClick={onClick}
                            class={classNames(
                                "duration-150 ease-in-out",
                                isDisabled() && "opacity-60 italic",
                            )}
                        />
                    );
                }}
            />
            <LinkButton href="/">Back</LinkButton>
        </>
    );
};

export default BuiltinCards;
