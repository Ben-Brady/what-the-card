import { useRegisterSW } from "virtual:pwa-register/solid";

const MINUTE = 60 * 1000;
const UPDATE_PERIODS = 1 * MINUTE;

export const usePWAUpdate = () => {
    useRegisterSW({
        onRegisteredSW(swUrl, r) {
            if (UPDATE_PERIODS <= 0) return;
            if (r?.active?.state === "activated") {
                registerPeriodicSync(UPDATE_PERIODS, swUrl, r);
            } else if (r?.installing) {
                r.installing.addEventListener("statechange", (e) => {
                    const sw = e.target as ServiceWorker;
                    if (sw.state === "activated") registerPeriodicSync(UPDATE_PERIODS, swUrl, r);
                });
            }
        },
    });

    function registerPeriodicSync(period: number, swUrl: string, r: ServiceWorkerRegistration) {
        if (period <= 0) return;

        setInterval(async () => {
            if ("onLine" in navigator && !navigator.onLine) return;

            const resp = await fetch(swUrl, {
                cache: "no-store",
                headers: {
                    "cache": "no-store",
                    "cache-control": "no-cache",
                },
            });

            if (resp?.status === 200) await r.update();
        }, period);
    }
};
