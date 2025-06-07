import { Game } from "@/components/Game/Game";
import { useSearchParams } from "@solidjs/router";
import { customCards } from "@/lib/custom";
import { filterCards } from "@/lib/filter-cards";

export default function GamePage() {
    const [params] = useSearchParams();

    const tagParam = () => (Array.isArray(params.tags) ? params.tags[0] : params.tags) ?? "";
    const tags = () => (tagParam() === "" ? [] : tagParam().split(","));
    const cards = () => filterCards(tags(), customCards());

    return <Game cards={cards()} />;
}
