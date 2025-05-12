import { Accessor, batch, Component, createSignal } from "solid-js";
import { Card } from "@/lib/pack";
import { Button, Input, Textarea } from "../Elements";
import { createModal } from "./Modal";

type EditModalControls = {
    open: (card: Card, onEdit: (card: Card) => void, onDelete: () => void) => void;
};

export const createEditModal = (): [Component, EditModalControls] => {
    const [title, setTitle] = createSignal<string>("");
    const [text, setText] = createSignal<string>("");
    const [onEdit, setOnEdit] = createSignal<(title: string, text: string) => void>(() => {});
    const [onDelete, setOnDelete] = createSignal<() => void>(() => {});
    const [onCancel, setOnCancel] = createSignal<() => void>(() => {});
    const [Modal, controls] = createModal();

    const element = () => (
        <Modal class="h-fit">
            <EditCardModal
                title={title}
                text={text}
                onEdit={onEdit}
                onDelete={onDelete}
                onCancel={onCancel}
            />
        </Modal>
    );

    const open = (card: Card, onEdit: (card: Card) => void, onDelete: () => void) => {
        batch(() => {
            setTitle(card.title);
            setText(card.description);
            setOnCancel(() => () => {
                controls.close();
            });
            setOnEdit(() => (title: string, description: string) => {
                onEdit({ title, description });
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
    onEdit: Accessor<(title: string, text: string) => void>;
    onCancel: Accessor<() => void>;
    onDelete: Accessor<() => void>;
};

const EditCardModal = ({ title, text, onCancel, onDelete, onEdit }: EditModalProps) => {
    return (
        <form
            class="w-full h-fit flex flex-col items-center gap-4 "
            onSubmit={(e) => {
                e.preventDefault();

                const data = new FormData(e.currentTarget);
                const title = data.get("title")! as string;
                const text = data.get("text")! as string;
                onEdit()(title, text);
            }}
        >
            <Input name="title" placeholder="Title" class="w-full text-2xl" value={title()} />
            <Textarea
                rows={5}
                name="text"
                placeholder="Description"
                class="w-full text-xl"
                value={text()}
                required
            />
            <div class="flex w-full gap-4">
                <Button class="flex-1" variant="destructive" onClick={onDelete()}>
                    Delete
                </Button>
                <Button class="flex-1" variant="primary" onClick={onCancel()}>
                    Cancel
                </Button>
                <Button class="flex-1" variant="primary" type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
};
