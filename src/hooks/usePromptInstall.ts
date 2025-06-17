import { Accessor, createMemo, createSignal } from "solid-js";

// TS doesn't have this included
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;

    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

type PromptInstallHook = {
    canInstall: Accessor<boolean>;
    install: () => void;
};

const [installEvent, setInstallEvent] = createSignal<BeforeInstallPromptEvent | undefined>();
window.addEventListener("beforeinstallprompt", (event) => {
    setInstallEvent(event as BeforeInstallPromptEvent);
});

export const usePromptInstall = (): PromptInstallHook => {
    const canInstall = createMemo(() => installEvent() !== undefined);
    const install = () => {
        const event = installEvent();
        if (event) event.prompt();
    };

    return { canInstall, install };
};
