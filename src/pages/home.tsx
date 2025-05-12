import { Show } from "solid-js";
import { usePromptInstall } from "../hooks/usePromptInstall";

import LogoSvg from "../assets/logo.svg?inline";
import { Button, LinkButton } from "@/components/Elements";
import { useStandalone } from "../hooks/useStandalone";
import classNames from "@/lib/classnames";

export default function HomePage() {
    const { canInstall, install } = usePromptInstall();
    const isStandalone = useStandalone();

    return (
        <div
            class={classNames(
                "w-full h-screen p-8 overflow-y-auto",
                "flex flex-col items-center justify-between gap-6",
            )}
        >
            <img class="w-full max-w-80" src={LogoSvg} />

            <div class="flex flex-col items-center gap-4 w-full h-full">
                <LinkButton variant="primary" href="/packs" preload>
                    Play
                </LinkButton>
                {/* <LinkButton variant="primary" href="/packs" preload>
                    Packs
                </LinkButton> */}
                {/*
                <LinkButton variant="primary" href="/create" preload>
                    Custom Cards
                </LinkButton>
                */}
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
