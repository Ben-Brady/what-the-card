import { createSignal, JSX, Show } from "solid-js";
import { Portal } from "solid-js/web";
import classNames from "../../lib/classnames";

type ModalControls = {
    open: () => void;
    close: () => void;
};

export type ModalComponent = (_: { class?: string; children: JSX.Element }) => JSX.Element;
export function createModal({
    noDismiss = false,
    onDismiss,
}: {
    noDismiss?: boolean;
    onDismiss?: () => void;
} = {}): [ModalComponent, ModalControls] {
    // We dynamically set this on render

    let openFunc = () => {};
    let closeFunc = () => {};

    const controls: ModalControls = {
        open: () => openFunc(),
        close: () => closeFunc(),
    };

    const component = ({
        class: className,
        children,
    }: {
        class?: string;
        children: JSX.Element;
    }) => {
        const [open, setIsOpen] = createSignal<boolean>(false);

        let elementRef: HTMLElement | undefined = undefined;

        openFunc = () => {
            setIsOpen(true);
        };
        closeFunc = () => {
            if (!elementRef) {
                setIsOpen(false);
                return;
            }

            const animation = elementRef.animate([{ opacity: 1 }, { opacity: 0 }], {
                easing: "ease-in-out",
                duration: 200,
                direction: "normal",
            });
            animation.onfinish = () => {
                setIsOpen(false);
            };
        };

        return (
            <Show when={open()}>
                <Portal>
                    <div
                        ref={(element) => {
                            elementRef = element;
                        }}
                        class={classNames(
                            "fixed left-0 top-0 z-40",
                            "h-full w-full bg-black/80",
                            "flex justify-center items-center",
                            "starting:opacity-0 opacity-100 transition-opacity duration-300",
                        )}
                        on:click={(e) => {
                            if (noDismiss) return;

                            const isBackdropClick = e.currentTarget === e.target;
                            if (!isBackdropClick) return;

                            onDismiss?.();
                            closeFunc();
                        }}
                    >
                        <div
                            class={classNames(
                                "bg-blue-400 w-4/5 h-4/5 max-w-192 max-h-128 rounded-lg py-4 px-8",
                                className,
                            )}
                        >
                            {children}
                        </div>
                    </div>
                </Portal>
            </Show>
        );
    };

    return [component, controls];
}
