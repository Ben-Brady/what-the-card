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
import { For, Show } from "solid-js";
import { uuidv4 } from "@/lib/uuid";
import HomeLayout from "@/components/HomeLayout";
import { calculateMasonryColumns } from "@/lib/masonary";

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

    const cards = () => customCards();
    // const cards = () => builtinCards.map((v) => ({ ...v, id: v.text }));

    const onAddNewCard = () => {
        const blankCard = cards().find((card) => !card.title && !card.text);

        if (blankCard) {
            openCardModal(blankCard);
        } else {
            const card: CustomCard = { id: uuidv4(), text: "" };
            addCustomCard(card);
            openCardModal(card);
        }
    };

    const columns = () =>
        calculateMasonryColumns({
            columnCount: 2,
            items: cards(),
            calculateHeight: (card) => {
                const GAP = 16;
                const LINE_WIDTH = 28;
                const LINE_HEIGHT = 16;

                const lineCount = Math.floor(card.text.length / LINE_WIDTH);
                return lineCount * LINE_HEIGHT + GAP;
            },
        });

    const count = () => customCards().length;

    return (
        <>
            <EditModal />

            <HomeLayout depth="2">
                <span class="text-2xl text-neutral-900">
                    {count() === 0
                        ? "No Custom Card"
                        : count() === 1
                        ? "1 Custom Card"
                        : `${count()} Custom Cards`}
                </span>

                {/* Single column */}
                <div class="size-full xs:hidden flex flex-col gap-4 h-full overflow-y-auto">
                    <For each={cards()}>
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
                    <Button onClick={onAddNewCard}>Create New Card</Button>
                    <LinkButton href="/">Back</LinkButton>
                </ButtonColumn>
            </HomeLayout>
        </>
    );
}

const CardComponent = (props: { card: CustomCard; onClick: () => void }) => {
    const tags = () => (props.card.tags ? props.card.tags : []);

    return (
        <button
            id={props.card.id}
            onClick={() => props.onClick()}
            class={
                "w-full h-fit px-2 py-4 " +
                "flex flex-col justify-center " +
                "bg-blue-600 rounded-md cursor-pointer"
            }
        >
            <p class="w-full text-2xl text-center underline">{props.card.title}</p>
            <div class="flex gap-2 w-full justify-center italic">
                <Show when={tags().includes("4-players")}>
                    <span class="italic">4+ Players</span>
                </Show>
                <Show when={tags().includes("horny")}>
                    <span class="italic">Horny</span>
                </Show>
                <Show when={tags().includes("extreme")}>
                    <span class="italic">Extreme</span>
                </Show>
            </div>
            <p class="w-full text-xl text-center overflow-ellipsis wrap-anywhere overflow-hidden">
                {props.card.text}
            </p>
        </button>
    );
};
