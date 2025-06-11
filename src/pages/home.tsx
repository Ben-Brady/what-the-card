import { Show } from "solid-js";
import LogoSvg from "@/assets/images/logo.svg?inline";
import HomeLayout from "@/components/HomeLayout";
import { Button, ButtonColumn, LinkButton } from "@/components/Elements";
import { useStandalone } from "@/hooks/useStandalone";
import { usePromptInstall } from "@/hooks/usePromptInstall";

export default function HomePage() {
    const { canInstall, install } = usePromptInstall();
    const isStandalone = useStandalone();

    return (
        <HomeLayout>
            <img
                class="w-full max-w-80 pb-4"
                src={LogoSvg}
                width={320}
                height={320}
                alt="What the Card Logo"
            />
            <ButtonColumn class="h-full">
                <LinkButton href="/play">Play</LinkButton>
                <LinkButton href="/cards">Cards</LinkButton>
                <LinkButton href="/packs">Packs</LinkButton>
                <LinkButton href="/about">About</LinkButton>
                <Show when={!isStandalone() && canInstall()}>
                    <Button onClick={install}>Install</Button>
                </Show>
            </ButtonColumn>
        </HomeLayout>
    );
}
