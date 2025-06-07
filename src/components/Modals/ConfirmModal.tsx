import { Component, createSignal } from "solid-js";
import { createModal } from "./Modal";
import { Button } from "@/components/Elements";

type PromptOptions = {
    title?: string;
    subtitle?: string;
};
type PromptFunction = (options: PromptOptions) => Promise<boolean>;

export function createConfirmationModal(): [Component, PromptFunction] {
    const [Modal, modalControls] = createModal({
        onDismiss: () => resolveRef?.(false),
    });
    const [title, setTitle] = createSignal<string>("");
    const [subtitle, setsSubtitle] = createSignal<string>("");

    let resolveRef: ((value: boolean) => void) | undefined;

    const prompt: PromptFunction = (options) => {
        setTitle(options?.title ?? "");
        setsSubtitle(options?.subtitle ?? "");
        modalControls.open();
        return new Promise((resolve) => {
            resolveRef = resolve;
        });
    };

    const component = () => {
        const onClick = (success: boolean) => {
            modalControls.close();
            resolveRef?.(success);
        };

        return (
            <Modal class="h-fit">
                <div class="flex flex-col items-center">
                    <span class="text-2xl text-center">{title()}</span>
                    <span class="text-xl text-center mb-8">{subtitle()}</span>

                    <div class="w-full flex gap-4">
                        <Button class="flex-1" onClick={() => onClick(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" class="flex-1" onClick={() => onClick(true)}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    };

    return [component, prompt];
}
