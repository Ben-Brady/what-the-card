import { Game } from "@/components/Game/Game";
import { cards } from "@/assets/cards";
import { useParams } from "@solidjs/router";

export default function GamePage() {
    const params = useParams();
    const tagParam = params.tags ?? "";
    const tags = tagParam.split(",");
    const filteredCards = cards.filter((card) => {
        if (!card.tags) return true;
        for (const tag of card.tags) {
            if (!tags.includes(tag)) return false;
        }
        return true;
    });

    return <Game cards={filteredCards} />;
}
