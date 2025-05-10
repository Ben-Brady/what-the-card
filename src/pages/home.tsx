import { Show, For } from "solid-js";
import { usePromptInstall } from "../hooks/usePromptInstall";
import { listPacks } from "../lib/pack";

import LogoSvg from "../assets/logo.svg?inline";
import { Button, LinkButton } from "../components/Elements";
import { useStandalone } from "../hooks/useStandalone";

export default function HomePage() {
    const { canInstall, install } = usePromptInstall();
    const isStandalone = useStandalone();
    const packs = listPacks();

    return (
        <div class="w-full h-screen py-8 px-8 flex justify-center overflow-y-auto">
            <div class="w-full h-fit flex flex-col items-center gap-8">
                <img class="flex-1 w-full max-w-80" src={LogoSvg} />

                <Show when={canInstall() && !isStandalone()}>
                    <div class="flex flex-col items-center gap-4 w-full">
                        <Button
                            class="w-full max-w-80 min-h-14 h-fit"
                            variant="primary"
                            on:click={() => install()}
                        >
                            Install
                        </Button>
                        {/* <LinkButton
                        variant="secondary"
                        href="/create"
                        class="w-full max-w-80 min-h-14 h-fit"
                        preload
                        >
                        Create New Pack
                        </LinkButton> */}
                    </div>
                </Show>

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
            </div>
        </div>
    );
}
