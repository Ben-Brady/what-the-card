import * as v from "valibot";
import { Card } from "./pack";
import { createSavedStore } from "./store";

export const CustomCard = v.intersect([
    Card,
    v.object({
        id: v.string(),
    }),
]);
export type CustomCard = v.InferOutput<typeof CustomCard>;

const [storedCards, setStoredCards] = createSavedStore({
    key: "custom-cards",
    schema: v.array(CustomCard),
    defaultValue: [],
});

export const customCards = () => {
    return storedCards().filter((v) => v.text);
};

export const addCustomCard = (card: CustomCard) => {
    const newCards = [...storedCards(), card];
    setStoredCards(newCards);
};

export const deleteCustomCard = (id: string) => {
    const newCards = storedCards().filter((v) => v.id !== id);
    setStoredCards(newCards);
};

export const updateCustomCard = (newCard: CustomCard) => {
    const newCards = storedCards().map((v) => (v.id === newCard.id ? newCard : v));
    setStoredCards(newCards);
};
