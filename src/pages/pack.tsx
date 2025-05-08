import { createResource, Show, Suspense } from "solid-js";
import { useParams } from "@solidjs/router";
import { doesPackExist, getPack } from "../lib/pack.ts";
import { firstCardColor, Game } from "../components/Game/Game.tsx";
import { useCaptureInstallPrompt } from "../hooks/usePromptInstall.ts";

export default function GamePage() {
    useCaptureInstallPrompt();

    const params = useParams();
    const id = params.id;
    const exists = doesPackExist(id);
    if (!exists) {
        location.replace("/");
        return null;
    }

    const [pack] = createResource(async () => {
        try {
            return await getPack(id);
        } catch (e) {
            location.replace("/");
            throw e;
        }
    });

    return (
        <Suspense fallback={Loading}>
            <Show when={pack()}>
                <Game pack={pack()!} />
            </Show>
        </Suspense>
    );
}

const Loading = <div class="absolute inset-0" style={{ background: firstCardColor }} />;
