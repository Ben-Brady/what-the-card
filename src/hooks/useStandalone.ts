import { createSignal } from "solid-js";

export const useStandalone = () => {
    const query = window.matchMedia("(display-mode: standalone)");
    query.addEventListener("change", (e) => {
        setStandalone(e.matches);
    });

    const [standalone, setStandalone] = createSignal(query.matches);

    return standalone;
};
