import { Game } from "@/components/Game/Game.tsx";
import { cards } from "@/assets/cards.ts";
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
    console.log({ cards, filteredCards });

    return <Game cards={filteredCards} />;
}
