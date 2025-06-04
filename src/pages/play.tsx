import { Checkbox } from "@/components/Checkbox";
import HomeLayout from "@/components/HomeLayout";
import { LinkButton } from "@/components/Elements";
import { CardTag } from "@/lib/pack";
import { Accessor, createSignal, Show } from "solid-js";
import { createModal } from "@/components/Modals/Modal";
import { customCards } from "@/lib/custom";
import classNames from "@/lib/classnames";
import { filterCards } from "@/lib/filter-cards";

export default function PlayPage() {
    const [Modal, modalControls] = createModal();

    const tagDefault = useSessionValue("tag-default", true);
    const tagCustom = useSessionValue("tag-custom", true);
    const tagFourPlayers = useSessionValue("tag-4player", true);
    const tagHorny = useSessionValue("tag-horny", true);
    const tagExtreme = useSessionValue("tag-extreme", false);

    const hasCustomCards = () => customCards().length !== 0;
    const cards = () => filterCards(tags(), customCards());
    const hasEmptyDeck = () => cards().length === 0;

    const tags = () => {
        const tags: CardTag[] = [];
        if (tagFourPlayers.value()) tags.push("4-players");
        if (tagHorny.value()) tags.push("horny");
        if (tagExtreme.value()) tags.push("extreme");
        if (tagCustom.value() || !hasCustomCards()) tags.push("custom");
        if (tagDefault.value() || !hasCustomCards()) tags.push("default");

        return tags;
    };

    const url = () => {
        if (tags().length === 0) {
            return `/game/play`;
        } else {
            return `/game/play?tags=${tags().join(",")}`;
        }
    };

    return (
        <HomeLayout>
            <h3 class="text-3xl text-neutral-900">Select Your Cards</h3>
            <div class="size-full flex flex-col items-center gap-2 max-w-80">
                <Show when={hasCustomCards()}>
                    <CheckboxRow
                        text="Built-in Cards"
                        description={`
                        The Built-in cards included with the game

                        Toggle this off to only use your custom cards
                        `}
                        defaultValue={tagDefault.value()}
                        onSet={(v) => tagDefault.set(v)}
                    />
                    <CheckboxRow
                        text="Custom Cards"
                        description={`
                            The custom cards you've made yourself

                            Toggle this off to only use your the Built-in cards
                            `}
                        defaultValue={tagCustom.value()}
                        onSet={(v) => tagCustom.set(v)}
                    />
                    <div class="mb-2" />
                </Show>
                <CheckboxRow
                    text="4+ Players"
                    description="These cards require 4 or more players to play"
                    defaultValue={tagFourPlayers.value()}
                    onSet={(v) => tagFourPlayers.set(v)}
                />
                <CheckboxRow
                    text="Horny Cards"
                    description={`
                    These cards involve shipping relationships, talking about fantasies, and mild sex acts (like making out with a fruit).

                    Great for parties, but not recommended for friend groups where relationships would be awkward.
                    `}
                    defaultValue={tagHorny.value()}
                    onSet={(v) => tagHorny.set(v)}
                />
                <CheckboxRow
                    text="Extreme Cards"
                    description={`
                    These cards include more extreme cards, such as kissing other players or sniffing feat.

                    Not recommend for most groups.
                    `}
                    defaultValue={tagExtreme.value()}
                    onSet={(v) => tagExtreme.set(v)}
                />
            </div>

            <div class="w-full flex flex-col items-center gap-4">
                <LinkButton
                    href={url()}
                    onClick={(e) => {
                        if (hasEmptyDeck()) {
                            e.preventDefault();
                            modalControls.open();
                        }
                    }}
                    class={classNames(hasEmptyDeck() && "opacity-70")}
                >
                    Start ({cards().length} Cards)
                </LinkButton>
                <LinkButton href="/">Back</LinkButton>
            </div>

            <Modal class="h-fit text-center flex flex-col gap-2">
                <h2 class="text-3xl">Empty Deck!</h2>
                <p class="whitespace-pre-line">
                    {"The settings you've selected created a deck with no cards" +
                        "\n\n" +
                        "Turn on the built-in cards to fix this or create some custom cards"}
                </p>
            </Modal>
        </HomeLayout>
    );
}

type CheckboxRowProps = {
    text: string;
    description: string;
    defaultValue: boolean;
    onSet: (value: boolean) => void;
};

const CheckboxRow = (props: CheckboxRowProps) => {
    const [Modal, controls] = createModal();

    return (
        <div class="w-full flex items-center justify-between gap-2">
            <Checkbox value={() => props.defaultValue} onChange={(value) => props.onSet(value)} />
            <span class="text-neutral-900 text-xl flex-1">{props.text}</span>
            <button onClick={() => controls.open()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="text-neutral-900 size-6"
                >
                    <path
                        fill="currentColor"
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                    />
                </svg>
            </button>
            <Modal class="h-fit text-center flex flex-col gap-2">
                <h2 class="text-3xl">{props.text}</h2>
                <p class="whitespace-pre-line">{props.description.trim()}</p>
            </Modal>
        </div>
    );
};

type SessionValueHook<T> = {
    value: Accessor<T>;
    set: (value: T) => void;
};

function useSessionValue<T>(key: string, defaultValue: T): SessionValueHook<T> {
    const KEY = `sv:${key}`;

    const intialValue = !sessionStorage.getItem(KEY)
        ? defaultValue
        : JSON.parse(sessionStorage.getItem(KEY)!);

    const [value, setValue] = createSignal<T>(intialValue);

    const set = (newValue: T) => {
        sessionStorage.setItem(KEY, JSON.stringify(newValue));
        setValue(() => newValue);
    };

    return { set, value };
}
