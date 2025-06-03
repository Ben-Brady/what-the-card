import { cards } from "@/assets/cards";
import { Card } from "@/lib/pack";

const taggedDefaultCards: Card[] = cards.map((v) => ({
    ...v,
    tags: v.tags ? [...v.tags, "default"] : ["default"],
}));

export const filterCards = (tags: string[], customCards: Card[]) => {
    const taggedCustomCards: Card[] = customCards.map((v) => ({
        ...v,
        tags: v.tags ? [...v.tags, "custom"] : ["custom"],
    }));
    const allCards = taggedCustomCards.concat(taggedDefaultCards);

    return allCards.filter((card) => {
        if (!card.tags || card.tags.length === 0) return true;

        for (const tag of card.tags) {
            if (!tags.includes(tag)) return false;
        }

        return true;
    });
};
