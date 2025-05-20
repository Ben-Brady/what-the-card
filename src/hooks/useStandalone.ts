import { createSignal } from "solid-js";

const query = window.matchMedia("(display-mode: standalone)");

export const useStandalone = () => {
    const [standalone, setStandalone] = createSignal(query.matches);
    query.addEventListener("change", (e) => {
        setStandalone(e.matches);
    });

    return standalone;
};
