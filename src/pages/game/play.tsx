import { Game } from "@/components/Game/Game";
import { cards } from "@/assets/cards";
import { useSearchParams } from "@solidjs/router";
import { customCards } from "@/lib/custom";
import { Card } from "@/lib/pack";
import { filterCards } from "@/lib/filter-cards";

export default function GamePage() {
    const [params] = useSearchParams();

    const tagParam = () => (Array.isArray(params.tags) ? params.tags[0] : params.tags) ?? "";
    const tags = () => (tagParam() === "" ? [] : tagParam().split(","));
    const cards = () => filterCards(tags(), customCards());

    return <Game cards={cards()} />;
}
