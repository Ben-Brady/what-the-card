import { Show } from "solid-js";
import LogoSvg from "@/assets/images/logo.svg?inline";
import HomeLayout from "@/components/HomeLayout";
import { Button, LinkButton } from "@/components/Elements";
import { useStandalone } from "@/hooks/useStandalone";
import { usePromptInstall } from "@/hooks/usePromptInstall";

export default function HomePage() {
    const { canInstall, install } = usePromptInstall();
    const isStandalone = useStandalone();

    return (
        <HomeLayout depth="1">
            <img class="w-full max-w-80 pb-4" src={LogoSvg} width={320} height={320} alt="What the Card Logo"/>
            <div class="flex flex-col items-center gap-4 w-full h-full">
                <LinkButton variant="primary" href="/play" preload>
                    Play
                </LinkButton>
                <LinkButton variant="primary" href="/packs" preload>
                    Packs
                </LinkButton>
                <LinkButton variant="primary" href="/about" preload>
                    About
                </LinkButton>
                <Show when={!isStandalone() && canInstall()}>
                    <Button variant="primary" onClick={install}>
                        Install
                    </Button>
                </Show>
            </div>
        </HomeLayout>
    );
}
