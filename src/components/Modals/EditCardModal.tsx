import { Accessor, batch, Component, createSignal } from "solid-js";
import { Card, CardTag } from "@/lib/pack";
import { Button, Input, Textarea } from "../Elements";
import { createModal } from "./Modal";
import { Checkbox } from "../Checkbox";
import { effect } from "solid-js/web";

type EditModalControls = {
    open: (card: Card, onEdit: (card: Card) => void, onDelete: () => void) => void;
};

export const createEditModal = (): [Component, EditModalControls] => {
    const [title, setTitle] = createSignal<string>("");
    const [text, setText] = createSignal<string>("");
    const [tags, setTags] = createSignal<CardTag[]>([]);
    const [onEdit, setOnEdit] = createSignal<
        (title: string, text: string, tags: CardTag[]) => void
    >(() => {});
    const [onDelete, setOnDelete] = createSignal<() => void>(() => {});
    const [onCancel, setOnCancel] = createSignal<() => void>(() => {});
    const [Modal, controls] = createModal();

    const element = () => (
        <Modal class="h-fit w-128">
            <EditCardModal
                title={title}
                text={text}
                tags={tags}
                onEdit={onEdit()}
                onDelete={onDelete()}
                onCancel={onCancel()}
            />
        </Modal>
    );

    const open = (card: Card, onEdit: (card: Card) => void, onDelete: () => void) => {
        batch(() => {
            setTitle(card.title ?? "");
            setText(card.text);
            setTags(card.tags ?? []);
            setOnCancel(() => () => {
                controls.close();
            });
            setOnEdit(() => (title: string, text: string, tags: CardTag[]) => {
                onEdit({ title, text, tags });
                controls.close();
            });
            setOnDelete(() => () => {
                onDelete();
                controls.close();
            });
        });
        controls.open();
    };

    const editControls: EditModalControls = { open };

    return [element, editControls] as const;
};

type EditModalProps = {
    title: Accessor<string>;
    text: Accessor<string>;
    tags: Accessor<CardTag[]>;
    onEdit: (title: string, text: string, tags: CardTag[]) => void;
    onCancel: () => void;
    onDelete: () => void;
};

const NAME_4PLAYER = "tag-4player";
const NAME_HORNY = "tag-horny";
const NAME_EXTREME = "tag-extreme";

const EditCardModal = (props: EditModalProps) => {
    const [tag4Player, setTag4Player] = createSignal<boolean>(false);
    const [tagHorny, setTagHorny] = createSignal<boolean>(false);
    const [tagExtreme, setTagExtreme] = createSignal<boolean>(false);

    effect(() => {
        const tags = props.tags();
        setTag4Player(tags.includes("4-players"));
        setTagHorny(tags.includes("horny"));
        setTagExtreme(tags.includes("extreme"));
    });

    return (
        <form
            class="w-full max-h-screen overflow-y-auto overflow-hidden flex flex-col items-center gap-4"
            onSubmit={(e) => {
                e.preventDefault();

                const data = new FormData(e.currentTarget);
                const title = data.get("title")! as string;
                const text = data.get("text")! as string;

                const tags: CardTag[] = [];
                if (tag4Player()) tags.push("4-players");
                if (tagHorny()) tags.push("horny");
                if (tagExtreme()) tags.push("extreme");

                props.onEdit(title, text, tags);
            }}
        >
            <Input
                name="title"
                placeholder="Title"
                class="w-full text-xl placeholder:text-2l text-center"
                value={props.title()}
            />
            <Textarea
                rows={5}
                name="text"
                placeholder="Description"
                class="w-full text-xl placeholder:text-xl text-center"
                value={props.text()}
                required
            />
            <div class="grid grid-cols-2 place-items-center gap-y-2">
                <span class="text-right w-full text-xl">4+ Players</span>
                <Checkbox value={tag4Player} onChange={(v) => setTag4Player(v)} />
                <span class="text-right w-full text-xl">Horny</span>
                <Checkbox value={tagHorny} onChange={(v) => setTagHorny(v)} />
                <span class="text-right w-full text-xl">Extreme</span>
                <Checkbox value={tagExtreme} onChange={(v) => setTagExtreme(v)} />
            </div>
            <Button class="flex-1" variant="primary" width="full" type="submit">
                Save
            </Button>
            <Button class="flex-1" variant="primary" width="full" onClick={() => props.onCancel()}>
                Cancel
            </Button>
            <Button
                class="flex-1"
                variant="destructive"
                width="full"
                onClick={() => props.onDelete()}
            >
                Delete
            </Button>
        </form>
    );
};
