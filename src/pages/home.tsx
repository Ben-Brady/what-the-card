import { Show, For } from "solid-js";
import { usePromptInstall } from "../hooks/usePromptInstall";
import { packs } from "../lib/pack";

import LogoSvg from "../assets/logo.svg?inline";

export default function HomePage() {
    const { canInstall, install } = usePromptInstall();

    return (
        <div class="w-full h-screen pt-24 px-16 flex justify-center">
            <div class="flex flex-col items-center gap-4 w-full">
                <img class="w-[50vw] max-w-96 h-auto xl:size-48 pb-12" src={LogoSvg} />
                <For each={packs}>
                    {(pack) => (
                        <a
                            class="w-full max-w-80 content-center text-center min-h-14 h-fit px-4 py-2 bg-blue-600 rounded-lg text-2xl"
                            href={`/pack/${pack.id}`}
                        >
                            {pack.title}
                        </a>
                    )}
                </For>
                <Show when={canInstall()}>
                    <button
                        class="w-full max-w-80 content-center text-center min-h-14 h-fit px-4 py-2 bg-blue-600 rounded-lg text-2xl cursor-pointer"
                        on:click={() => install()}
                    >
                        Install
                    </button>
                </Show>
            </div>
        </div>
    );
}
