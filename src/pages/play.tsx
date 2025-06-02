import { Checkbox } from "@/components/Checkbox";
import HomeLayout from "@/components/HomeLayout";
import { LinkButton } from "@/components/Elements";
import { CardTag } from "@/lib/pack";
import { Accessor, createSignal } from "solid-js";
import { createModal } from "@/components/Modals/Modal";

export default function PlayPage() {
    const fourPlayersValue = useSessionValue("tag-4player", true);
    const hornyValue = useSessionValue("tag-horny", true);
    const extremeValue = useSessionValue("tag-extreme", false);

    const url = () => {
        const tags: CardTag[] = [];
        if (fourPlayersValue.value()) tags.push("4-players");
        if (hornyValue.value()) tags.push("horny");
        if (extremeValue.value()) tags.push("extreme");

        if (tags.length === 0) {
            return `/game/play`;
        } else {
            return `/game/play?tags=${tags.join(",")}`;
        }
    };

    return (
        <HomeLayout depth="2">
            <h3 class="text-3xl text-neutral-900">Select Your Cards</h3>
            <div class="size-full flex flex-col items-center gap-2 max-w-80">
                <CheckboxRow
                    text="4+ Players"
                    description="These cards require 4 or more players to play"
                    defaultValue={fourPlayersValue.value()}
                    onSet={(v) => fourPlayersValue.set(v)}
                />
                <CheckboxRow
                    text="Horny Cards"
                    description={`
                    These cards involve shipping relationships, talking about fantasies, and mild sex acts (like making out with a fruit).

                    Great for parties, but not recommended for friend groups where relationships would be awkward.
                    `}
                    defaultValue={hornyValue.value()}
                    onSet={(v) => hornyValue.set(v)}
                />
                <CheckboxRow
                    text="Extreme Cards"
                    description={`
                    These cards include more extreme cards, such as kissing other players or sniffing feat.

                    Not recommend for most groups.
                    `}
                    defaultValue={extremeValue.value()}
                    onSet={(v) => extremeValue.set(v)}
                />
            </div>

            <div class="w-full flex flex-col items-center gap-4">
                <LinkButton href={url()}>
                    Start
                </LinkButton>
                <LinkButton href="/" preload>
                    Back
                </LinkButton>
            </div>
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
