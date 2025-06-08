import { Game } from "@/components/Game/Game";
import { useSearchParams } from "@solidjs/router";
import { customCards } from "@/lib/custom";
import { generateCardsList } from "@/lib/filter-cards";
import { disabledIds } from "@/lib/enabled";

export default function GamePage() {
    const [params] = useSearchParams();

    const tagParam = () => (Array.isArray(params.tags) ? params.tags[0] : params.tags) ?? "";
    const tags = () => (tagParam() === "" ? [] : tagParam().split(","));
    const cards = () =>
        generateCardsList({
            tags: tags(),
            disabledIds: disabledIds(),
            customCards: customCards(),
        });

    return <Game cards={cards()} />;
}
