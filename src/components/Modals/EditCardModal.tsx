import { Accessor, batch, Component, createEffect, createSignal } from "solid-js";
import { Card, CardTag } from "@/lib/schema";
import { Button, Input, Textarea } from "@/components/Elements";
import { createModal } from "@/components/Modals/Modal";
import { Checkbox } from "@/components/Checkbox";

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
            <EditCardModalBody
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
                onEdit({ id: card.id, title, text, tags });
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

const EditCardModalBody = (props: EditModalProps) => {
    const [tag4Player, setTag4Player] = createSignal<boolean>(false);
    const [tagHorny, setTagHorny] = createSignal<boolean>(false);
    const [tagExtreme, setTagExtreme] = createSignal<boolean>(false);

    createEffect(() => {
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
            <div
                class={
                    "w-full flex items-center justify-center flex-wrap " +
                    "gap-4 max-xs:gap-2 max-xs:flex-col"
                }
            >
                <div class="flex items-center gap-2 w-fit">
                    <span class="text-right w-full text-xl max-xs:min-w-24">4+ Players</span>
                    <Checkbox value={tag4Player} onChange={(v) => setTag4Player(v)} />
                </div>
                <div class="flex items-center gap-2 w-fit">
                    <span class="text-right w-full text-xl max-xs:min-w-24">Horny</span>
                    <Checkbox value={tagHorny} onChange={(v) => setTagHorny(v)} />
                </div>
                <div class="flex items-center justify-start gap-2 w-fit">
                    <span class="text-right w-full text-xl max-xs:min-w-24">Extreme</span>
                    <Checkbox value={tagExtreme} onChange={(v) => setTagExtreme(v)} />
                </div>
            </div>
            <div class="flex w-full gap-4">
                <Button class="flex-1" width="full" type="submit" variant="save">
                    Save
                </Button>
                <Button
                    class="flex-1"
                    variant="destructive"
                    width="full"
                    onClick={() => props.onDelete()}
                >
                    Delete
                </Button>
            </div>
            <Button class="flex-1" width="full" onClick={() => props.onCancel()}>
                Cancel
            </Button>
        </form>
    );
};
