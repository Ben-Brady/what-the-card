import { cards } from "@/assets/cards";
import { Card } from "@/lib/pack";

export const generateCardsList = ({
    tags,
    customCards,
    disabledIds,
}: {
    tags: string[];
    disabledIds: string[];
    customCards: Card[];
}) => {
    const filteredCards = cards.filter((card) => !disabledIds.includes(card.id));
    const taggedDefaultCards: Card[] = filteredCards.map((v) => ({
        ...v,
        tags: v.tags ? [...v.tags, "default"] : ["default"],
    }));
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
