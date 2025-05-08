import { Accessor, createSignal } from "solid-js";
import { useAbortSignal } from "./useAbortSignal";

type PromptInstallHook = {
    canInstall: Accessor<boolean>;
    install: () => void;
};

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;

    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export const usePromptInstall = (): PromptInstallHook => {
    const event = useCaptureInstallPrompt();
    const canInstall = () => event() !== undefined;

    const install = () => {
        const installEvent = event();
        if (!installEvent) return;
        installEvent.prompt();
    };

    return { canInstall, install };
};

export const useCaptureInstallPrompt = (): Accessor<BeforeInstallPromptEvent | undefined> => {
    const [event, setEvent] = createSignal<BeforeInstallPromptEvent | undefined>();

    const signal = useAbortSignal();

    window.addEventListener(
        "beforeinstallprompt",
        (event: any) => {
            setEvent(event as BeforeInstallPromptEvent);
        },
        { signal },
    );

    return event;
};
