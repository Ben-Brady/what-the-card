import { For } from "solid-js";
import { listPacks } from "../lib/pack.ts";
import classNames from "@/lib/classnames.ts";
import { LinkButton } from "@/components/Elements.tsx";

export default function PacksPage() {
    const packs = listPacks();

    return (
        <div
            class={classNames(
                "w-full h-screen p-8 overflow-y-auto",
                "flex flex-col items-center gap-4 justify-between",
            )}
        >
            <div class="size-full flex flex-col items-center gap-4">
                <For each={packs}>
                    {(pack) => (
                        <LinkButton
                            variant="secondary"
                            href={`/pack/${pack.id}`}
                            preload
                        >
                            {pack.title}
                        </LinkButton>
                    )}
                </For>
            </div>
            <LinkButton variant="primary"  href="/" preload>
                Back
            </LinkButton>
        </div>
    );
}
