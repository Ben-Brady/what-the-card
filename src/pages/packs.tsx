import { For } from "solid-js";
import { listPacks } from "@/lib/packs";
import { LinkButton } from "@/components/Elements";
import HomeLayout from "@/components/HomeLayout";

export default function PacksPage() {
    const packs = listPacks();

    return (
        <HomeLayout>
            <div class="size-full flex flex-col items-center gap-4">
                <For each={packs}>
                    {(pack) => <LinkButton href={`/game/pack/${pack.id}`}>{pack.title}</LinkButton>}
                </For>
            </div>
            <LinkButton href="/">Back</LinkButton>
        </HomeLayout>
    );
}
