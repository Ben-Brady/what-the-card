import { createResource, Show, Suspense } from "solid-js";
import { useParams } from "@solidjs/router";
import { getPackListing } from "../lib/pack.ts";
import { Game } from "../components/Game/Game.tsx";
import { useCaptureInstallPrompt } from "../hooks/usePromptInstall.ts";
import { defaultCardColor } from "../hooks/useGame.ts";

export default function GamePage() {
    useCaptureInstallPrompt();

    const params = useParams();
    const id = params.id;
    const listing = getPackListing(id);
    if (!listing) {
        location.replace("/");
        return null;
    }

    const [pack] = createResource(listing.getData);

    return (
        <Suspense fallback={Loading}>
            <Show when={pack()}>
                <Game pack={pack()!} />
            </Show>
        </Suspense>
    );
}

const Loading = <div class="absolute inset-0" style={{ background: defaultCardColor }} />;
