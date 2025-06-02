import { Game } from "@/components/Game/Game";
import { cards } from "@/assets/cards";
import { useSearchParams } from "@solidjs/router";
import { customCards } from "@/lib/custom";

export default function GamePage() {
    const [params] = useSearchParams();
    const tagParam = () => (Array.isArray(params.tags) ? params.tags[0] : params.tags) ?? "";
    const tags = () => (tagParam() === "" ? [] : tagParam().split(","));

    const filteredCards = () => {
        return customCards().filter((card) => {
            if (!card.tags) return true;
            if (tags().length === 0) return true;
            for (const tag of card.tags) {
                if (!tags().includes(tag)) return false;
            }
            return true;
        });
    };

    return <Game cards={filteredCards()} />;
}
