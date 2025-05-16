import { For } from "solid-js";
import { listPacks } from "../lib/pack";
import { LinkButton } from "@/components/Elements";
import HomePageLayout from "@/components/ComponentPage";

export default function PacksPage() {
    const packs = listPacks();

    return (
        <HomePageLayout>
            <div class="size-full flex flex-col items-center gap-4">
                <For each={packs}>
                    {(pack) => (
                        <LinkButton variant="secondary" href={`/game/pack/${pack.id}`} preload>
                            {pack.title}
                        </LinkButton>
                    )}
                </For>
            </div>
            <LinkButton variant="primary" href="/" preload>
                Back
            </LinkButton>
        </HomePageLayout>
    );
}
