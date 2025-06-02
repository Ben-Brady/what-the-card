import { Card } from "../lib/pack";
import { Button, ButtonColumn, LinkButton } from "@/components/Elements";
import { createEditModal } from "@/components/Modals/EditCardModal";
import {
    CustomCard,
    customCards,
    addCustomCard,
    deleteCustomCard,
    updateCustomCard,
} from "../lib/custom";
import { For } from "solid-js";
import { uuidv4 } from "@/lib/uuid";
import HomeLayout from "@/components/HomeLayout";

export default function CustomCardsPage() {
    const [EditModal, modalControls] = createEditModal();

    const openCardModal = (card: CustomCard) => {
        const onEdit = (newCard: Card) => {
            updateCustomCard({ id: card.id, ...newCard });
        };

        const onDelete = () => {
            deleteCustomCard(card.id);
        };

        modalControls.open(card, onEdit, onDelete);
    };

    const onAddNewCard = () => {
        const blankCard = customCards().find((card) => !card.title && !card.text);

        if (blankCard) {
            openCardModal(blankCard);
        } else {
            const card: CustomCard = { id: uuidv4(), text: "" };
            addCustomCard(card);
            openCardModal(card);
        }
    };

    const columns = () => {
        type Column = {
            height: number;
            cards: CustomCard[];
        };

        const COLUMN_COUNT = 2;
        const columns: Column[] = Array.from({ length: COLUMN_COUNT }, () => ({
            height: 0,
            cards: [],
        }));

        for (const card of customCards()) {
            const shortestColumn = columns.sort((a, b) => a.height - b.height)[0];

            const GAP = 16;
            shortestColumn.height += GAP;

            const LINE_WIDTH = 28;
            const LINE_HEIGHT = 16;
            shortestColumn.height += Math.floor(card.text.length / LINE_WIDTH) * LINE_HEIGHT;

            shortestColumn.cards.push(card);
        }

        return columns.map((v) => v.cards);
    };

    return (
        <>
            <EditModal />
            
            <HomeLayout depth="2">
                <span class="text-2xl">{customCards().length} Custom Cards</span>

                {/* Single column */}
                <div class="size-full xs:hidden flex flex-col gap-4 h-full overflow-y-auto">
                    <For each={customCards()}>
                        {(card) => (
                            <CardComponent card={card} onClick={() => openCardModal(card)} />
                        )}
                    </For>
                </div>

                {/* Dual columns */}
                <div class="size-full hidden xs:flex gap-4 overflow-y-auto px-1 h-full">
                    <For each={columns()}>
                        {(column) => (
                            <div class="flex flex-col gap-4 w-full">
                                <For each={column}>
                                    {(card) => (
                                        <CardComponent
                                            card={card}
                                            onClick={() => openCardModal(card)}
                                        />
                                    )}
                                </For>
                            </div>
                        )}
                    </For>
                </div>

                <ButtonColumn>
                    <Button variant="primary" onClick={onAddNewCard}>
                        Create New Card
                    </Button>
                    <LinkButton href="/" variant="primary">
                        Back
                    </LinkButton>
                </ButtonColumn>
            </HomeLayout>
        </>
    );
}

const CardComponent = (props: { card: CustomCard; onClick: () => void }) => (
    <button
        id={props.card.id}
        onClick={() => props.onClick()}
        class={
            "w-full h-fit px-2 py-4 " +
            "flex flex-col justify-center " +
            "bg-sky-600 rounded-md cursor-pointer"
        }
    >
        <p class="w-full text-2xl text-center underline">{props.card.title}</p>
        <p class="w-full text-xl text-center overflow-ellipsis wrap-anywhere overflow-hidden">
            {props.card.text}
        </p>
    </button>
);
