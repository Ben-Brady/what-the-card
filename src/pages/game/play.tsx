import { Game } from "@/components/Game/Game";
import { cards } from "@/assets/cards";
import { useSearchParams } from "@solidjs/router";
import { customCards } from "@/lib/custom";

export default function GamePage() {
    const [params] = useSearchParams();
    const tagParam = () => (Array.isArray(params.tags) ? params.tags[0] : params.tags) ?? "";
    const tags = () => (tagParam() === "" ? [] : tagParam().split(","));

    const filteredCards = () => {
        const allCards = cards.concat(customCards());

        const allowedTags = tags();
        if (allowedTags.length === 0) return allCards;

        return allCards.filter((card) => {
            if (!card.tags || card.tags.length === 0) return true;

            for (const tag of card.tags) {
                if (!allowedTags.includes(tag)) return false;
            }

            return true;
        });
    };

    return <Game cards={filteredCards()} />;
}
