import * as v from "valibot";
import { Card } from "./schema";
import { createSchemaStore } from "./store";

const [storedCards, setStoredCards] = createSchemaStore({
    key: "custom-cards",
    schema: v.array(Card),
    defaultValue: [],
});

export const customCards = () => {
    return storedCards().filter((v) => v.text);
};

export const addCustomCard = (card: Card) => {
    const newCards = [...storedCards(), card];
    setStoredCards(newCards);
};

export const deleteCustomCard = (id: string) => {
    const newCards = storedCards().filter((v) => v.id !== id);
    setStoredCards(newCards);
};

export const updateCustomCard = (newCard: Card) => {
    const newCards = storedCards().map((v) => (v.id === newCard.id ? newCard : v));
    setStoredCards(newCards);
};
