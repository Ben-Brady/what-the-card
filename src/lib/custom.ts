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

export const [customCards, setCustomCards] = createSavedStore({
    key: "custom-cards",
    schema: v.array(CustomCard),
    defaultValue: [],
});

export const addCustomCard = (card: CustomCard) => {
    const newCards = [...customCards(), card];
    setCustomCards(newCards);
};

export const deleteCustomCard = (id: string) => {
    const newCards = customCards().filter((v) => v.id !== id);
    setCustomCards(newCards);
};

export const updateCustomCard = (newCard: CustomCard) => {
    const newCards = customCards().map((v) => (v.id === newCard.id ? newCard : v));
    setCustomCards(newCards);
};
