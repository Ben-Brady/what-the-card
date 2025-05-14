import { Show } from "solid-js";
import { usePromptInstall } from "../hooks/usePromptInstall";

import LogoSvg from "../assets/logo.svg?inline";
import { Button, LinkButton } from "@/components/Elements";
import { useStandalone } from "../hooks/useStandalone";
import classNames from "@/lib/classnames";

const VERSION = "1.1.1";

export default function HomePage() {
    const { canInstall, install } = usePromptInstall();
    const isStandalone = useStandalone();

    return (
        <div
            class={classNames(
                "w-full h-svh p-8 overflow-y-auto relative",
                "flex flex-col items-center justify-between gap-6",
            )}
        >
            <div class="absolute bottom-0 right-1 text-neutral-500">{VERSION}</div>
            <img class="w-full max-w-80" src={LogoSvg} />

            <div class="flex flex-col items-center gap-4 w-full h-full">
                <LinkButton variant="primary" href="/play" preload>
                    Play
                </LinkButton>
                <LinkButton variant="primary" href="/packs" preload>
                    Packs
                </LinkButton>
            </div>
            <div class="flex flex-col items-center gap-4 w-full">
                <Show when={canInstall() && !isStandalone()}>
                    <Button variant="primary" onClick={() => install()}>
                        Install
                    </Button>
                </Show>

                <LinkButton variant="primary" href="/about" preload>
                    About
                </LinkButton>
            </div>
        </div>
    );
}
