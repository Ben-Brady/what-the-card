import { useRegisterSW } from "virtual:pwa-register/solid";
import { RegisterSWOptions } from "vite-plugin-pwa/types";

const UPDATE_PERIOD = 60 * 1000;

export const usePWAUpdate = () => {
    useRegisterSW({ onRegisteredSW });
};

const onRegisteredSW: RegisterSWOptions["onRegisteredSW"] = (swUrl, reg) => {
    if (!reg) return;
    if (navigator.onLine === false) return;

    const register = async () => {
        const r = await fetch(swUrl, {
            cache: "no-store",
            headers: {
                "cache": "no-store",
                "cache-control": "no-cache",
            },
        });
        if (r.status === 200) await reg.update();
    };

    if (reg.active?.state === "activated") {
        setInterval(register, UPDATE_PERIOD);
    } else if (reg.installing) {
        reg.installing.addEventListener("statechange", (e) => {
            const sw = e.target as ServiceWorker;
            if (sw.state === "activated") {
                setInterval(register, UPDATE_PERIOD);
            }
        });
    }
};
