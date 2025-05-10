import * as v from "valibot";
import { Card, Pack, PackListing } from "./pack";

const KEY = "custom-pack";

export const listCustomPacks = (): PackListing[] => {
    return [
        {
            id: DEFAULT_PACK.id,
            title: DEFAULT_PACK.title,
            getData: async () => DEFAULT_PACK,
        },
    ];
};

export const setCustomPack = (title: string, cards: Card[]) => {
    const pack: Pack = {
        id: "custom",
        type: "normal",
        title,
        cards,
    };
    localStorage.setItem(KEY, JSON.stringify(pack));
};

const DEFAULT_PACK: Pack = {
    id: "custom",
    type: "normal",
    title: "Custom",
    cards: [],
};

export const getCustomPack = (): Pack => {
    const json = localStorage.getItem(KEY);
    if (!json) return DEFAULT_PACK;

    try {
        const data = JSON.parse(json);
        return v.parse(Pack, data);
    } catch (e) {
        console.error(e);

        localStorage.removeItem(KEY);
        return DEFAULT_PACK;
    }
};
