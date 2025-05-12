import { Accessor, createSignal } from "solid-js";

type PromptInstallHook = {
    canInstall: Accessor<boolean>;
    install: () => void;
};

const [installEvent, setInstallEvent] = createSignal<BeforeInstallPromptEvent | undefined>();

window.addEventListener("beforeinstallprompt", (event) => {
    setInstallEvent(event as BeforeInstallPromptEvent);
});

export const usePromptInstall = (): PromptInstallHook => {
    const canInstall = () => installEvent() !== undefined;

    const install = () => {
        const event = installEvent();
        if (!event) return;
        event.prompt();
    };

    return { canInstall, install };
};

// TS doesn't have this included
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;

    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}
