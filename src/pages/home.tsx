import { Show, For } from "solid-js";
import { usePromptInstall } from "../hooks/usePromptInstall";
import { listPacks } from "../lib/pack";

import LogoSvg from "../assets/logo.svg?inline";
import { Button, LinkButton } from "../components/Elements";

export default function HomePage() {
    const { canInstall, install } = usePromptInstall();
    const packs = listPacks();

    return (
        <div class="w-full h-screen pt-24 px-16 flex justify-center">
            <div class="flex flex-col items-center gap-8 w-full">
                <img class="w-[50vw] max-w-96 h-auto xl:size-48 pb-12" src={LogoSvg} />
                <div class="flex flex-col items-center gap-4 w-full">
                    <For each={packs}>
                        {(pack) => (
                            <LinkButton
                                variant="primary"
                                class="w-full max-w-80 min-h-14 h-fit"
                                href={`/pack/${pack.id}`}
                                preload
                            >
                                {pack.title}
                            </LinkButton>
                        )}
                    </For>
                </div>
                <div class="flex flex-col items-center gap-4 w-full">
                    <Show when={canInstall()}>
                        <Button
                            class="w-full max-w-80 min-h-14 h-fit"
                            variant="primary"
                            on:click={() => install()}
                        >
                            Install
                        </Button>
                    </Show>
                    <LinkButton
                        variant="secondary"
                        href="/create"
                        class="w-full max-w-80 min-h-14 h-fit"
                        preload
                    >
                        Create New Pack
                    </LinkButton>
                </div>
            </div>
        </div>
    );
}
