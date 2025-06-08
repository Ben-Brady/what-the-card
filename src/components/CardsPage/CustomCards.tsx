import { Card } from "@/lib/pack";
import { Button, ButtonColumn, LinkButton } from "@/components/Elements";
import { createEditModal } from "../Modals/EditCardModal";
import { addCustomCard, customCards, deleteCustomCard, updateCustomCard } from "@/lib/custom";
import { uuidv4 } from "@/lib/uuid";
import CardsColumm from "./CardColumns";
import CardComponent from "./CardComponent";

const CustomCards = () => {
    const [EditModal, modalControls] = createEditModal();

    const cardCount = () => customCards().length;

    const openCardModal = (card: Card) => {
        const onEdit = (newCard: Card) => {
            updateCustomCard({ ...newCard });
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
            const card: Card = { id: uuidv4(), text: "" };
            addCustomCard(card);
            openCardModal(card);
        }
    };

    return (
        <>
            <EditModal />

            <span class="text-2xl text-neutral-900">
                {cardCount() === 0
                    ? "No Custom Cards"
                    : cardCount() === 1
                    ? "1 Custom Card"
                    : `${cardCount()} Custom Cards`}
            </span>

            <CardsColumm
                cards={customCards()}
                component={(props) => (
                    <CardComponent card={props.card} onClick={() => openCardModal(props.card)} />
                )}
            />
            <ButtonColumn>
                <Button onClick={onAddNewCard}>Create New Card</Button>
                <LinkButton href="/">Back</LinkButton>
            </ButtonColumn>
        </>
    );
};

export default CustomCards;
