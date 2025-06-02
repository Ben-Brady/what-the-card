import { createSignal } from "solid-js";
import { Card } from "../lib/pack";
import { Button } from "@/components/Elements";
import { createAutoAnimate } from "@formkit/auto-animate/solid";
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


export default function CustomCardsPage() {
    const [title, setTitle] = createSignal<string>("");

    const [EditModal, modalControls] = createEditModal();
    const [parent] = createAutoAnimate(/* optional config */);

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
        const firstCard = customCards()[0];
        const isFirstCardBlank = firstCard && !firstCard.title && !firstCard.text;

        if (isFirstCardBlank) {
            openCardModal(firstCard);
        } else {
            const card: CustomCard = { id: uuidv4(), text: "" };
            addCustomCard(card);
            openCardModal(card);
        }
    };

    return (
        <div class="size-full px-8 py-4 flex flex-col">
            <Button variant="primary" class="mb-4" onClick={onAddNewCard}>
                Create New Card
            </Button>
            <div class="grid cols-autofill-48 w-full h-fit gap-8" ref={parent}>
                <For each={customCards()}>
                    {(card) => (
                        <div
                            class="bg-sky-400 rounded-md px-2 py-4 w-full min-h-24 cursor-pointer flex flex-col justify-center"
                            role="button"
                            onClick={() => openCardModal(card)}
                        >
                            <p class="w-full text-2xl text-center underline">{card.title}</p>
                            <p class="w-full text-xl text-center whitespace-pre-line">
                                {card.text}
                            </p>
                        </div>
                    )}
                </For>
            </div>
            <EditModal />
        </div>
    );
}
