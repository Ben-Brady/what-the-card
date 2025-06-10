import { createResource, Show, Suspense } from "solid-js";
import { getPackListing } from "@/lib/packs";
import { useParams } from "@solidjs/router";
import { Game } from "@/components/Game/Game";
import { defaultCardColor } from "@/hooks/useGame";

export default function PackPage() {
    const params = useParams();
    const id = params.id;
    const listing = getPackListing(id);
    if (!listing) {
        location.replace("/");
        // eslint-disable-next-line solid/components-return-once
        return <></>;
    }

    const [pack] = createResource(listing.getData);

    return (
        <Suspense fallback={Loading}>
            <Show when={pack()}>
                <Game cards={pack()!.cards} />
            </Show>
        </Suspense>
    );
}

const Loading = <div class="absolute inset-0" style={{ background: defaultCardColor }} />;
