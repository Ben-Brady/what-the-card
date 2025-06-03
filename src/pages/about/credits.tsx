import HomeLayout from "@/components/HomeLayout";
import { LinkButton } from "@/components/Elements";

export default function CreditsPage() {
    return (
        <HomeLayout depth="3">
            <div class="size-full flex flex-col gap-2 text-neutral-900 text-center">
                <h1 class="text-3xl">Credits</h1>
                <p class="text-xl">Ben Brady - Sole Developer</p>
                <h1 class="text-2xl">Additional Credits</h1>
                <div class="flex flex-col">
                    <p>Alice Greenhill - Original Version</p>
                    <p>Ben Dodwell - Original Version</p>
                    <p>Casey Tarhan-King - Original Version</p>
                    <p>Levi Rockwell-Jones - Original Version</p>
                    <p>Oliver Richardson - Original Version</p>
                    <p>Ralph Smith - Original Version</p>
                    <p>Theo Hall - Original Version</p>
                </div>
            </div>
            <LinkButton href="/about" preload>
                Back
            </LinkButton>
        </HomeLayout>
    );
}
