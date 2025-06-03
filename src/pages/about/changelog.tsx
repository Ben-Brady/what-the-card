import HomeLayout from "@/components/HomeLayout";
import { LinkButton } from "@/components/Elements";
import { For } from "solid-js";

type Version = {
    version: string;
    changes: string[];
};

const versions: Version[] = [
    {
        version: "1.4.4",
        changes: [
            "Added the ability to filter on default and custom cards",
            "Added preview to the number of cards in a deck",
            "Added warning when you create an empty deck",
        ],
    },
    { version: "1.4.3", changes: ["Added changelog", "Updated custom card colours", "a"] },
    { version: "1.4.2", changes: ["Minor tweaks and performance improvements"] },
    { version: "1.4.1", changes: ["Minor tweaks and performance improvements"] },
    { version: "1.4.0", changes: ["Added custom cards", "Moved version number to bottom right"] },
    {
        version: "1.3.1",
        changes: ["Performance improvements", "Updated Description", "Misc tweaks"],
    },
    {
        version: "1.3.0",
        changes: [
            "Changed how you skip cards, you now tap each side of the screen rather than drag",
            "Fixed some typos in card",
            "Limited the speed you can tap cards",
            "Removed leftover logging",
        ],
    },
    { version: "1.2.2", changes: ["Removed reloading and zoom on mobile"] },
    { version: "1.2.1", changes: ["Fixed tag filters not being used"] },
    { version: "1.2.0", changes: ["Updated Drag Overlay", "Added more cards to regular play"] },
    {
        version: "1.1.2",
        changes: [
            "Made home page more consistent between screens",
            "Removed delay when tapping cards",
            "Added animation to cards",
            "Performance improvements",
            "Added play tags",
            "Added animations when going between screens",
        ],
    },
    {
        version: "1.1.1",
        changes: ["Added version number"],
    },
];

export default function CreditsPage() {
    return (
        <HomeLayout depth="3">
            <h1 class="text-3xl">Change Log</h1>
            <div class="size-full overflow-y-auto flex flex-col gap-2 text-neutral-900">
                <For each={versions}>
                    {({ version, changes }) => (
                        <>
                            <h2 class="text-2xl">{version}</h2>
                            <ol class="pl-4">
                                <For each={changes}>
                                    {(v) => <li class="list-disc list-inside">{v}</li>}
                                </For>
                            </ol>
                        </>
                    )}
                </For>
            </div>
            <LinkButton href="/about" preload>
                Back
            </LinkButton>
        </HomeLayout>
    );
}
