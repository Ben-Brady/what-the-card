import { LinkButton } from "@/components/Elements";
import classNames from "@/lib/classnames.ts";

export default function CreditsPage() {
    return (
        <div
            class={classNames(
                "size-full p-8 overflow-y-auto",
                "flex flex-col items-center justify-between gap-4",
            )}
        >
            <div class="size-full flex flex-col gap-2">
                <h1 class="text-neutral-900 text-3xl text-center">Credits</h1>
                <p class="text-neutral-900 text-xl">Ben Brady - Sole Developer</p>
                <h1 class="text-neutral-900 text-2xl">Additional Credits</h1>
                <div class="flex flex-col">
                    <p class="text-neutral-900">Alice Greenhill - Original Version</p>
                    <p class="text-neutral-900">Ben Dodwell - Original Version</p>
                    <p class="text-neutral-900">Casey Tarhan-King - Original Version</p>
                    <p class="text-neutral-900">Levi Rockwell-Jones - Original Version</p>
                    <p class="text-neutral-900">Oliver Richardson - Original Version</p>
                    <p class="text-neutral-900">Ralph Smith - Original Version</p>
                    <p class="text-neutral-900">Theo Hall - Original Version</p>
                </div>
            </div>
            <LinkButton variant="primary" href="/about" preload>
                Back
            </LinkButton>
        </div>
    );
}
