import WhatTheCardURL from "@/assets/packs/what-the-card.json?url";
import BrutalHandoverURL from "@/assets/packs/brutal-hangover.json?url";
import DrunkPirateURL from "@/assets/packs/drunk-pirates.json?url";
import NeverendingTrashURL from "@/assets/packs/neverending-trash.json?url";
import { Pack } from "./schema";


export type PackListing = {
    id: string;
    title: string;
    getData: () => Promise<Pack>;
};

const createDownloadFunc = (url: string) => async (): Promise<Pack> => {
    const r = await fetch(url);
    const json = await r.json();
    return json as Pack;
};

const BUILTIN_PACKS: PackListing[] = [
    {
        id: "what-the-cards",
        title: "What The Card",
        getData: createDownloadFunc(WhatTheCardURL),
    },
    {
        id: "brutal-hangover",
        title: "Terrible Morning",
        getData: createDownloadFunc(BrutalHandoverURL),
    },
    {
        id: "drunk-pirates",
        title: "Drunk Pirates",
        getData: createDownloadFunc(DrunkPirateURL),
    },
    {
        id: "neverending-trash",
        title: "The Neverending Pile",
        getData: createDownloadFunc(NeverendingTrashURL),
    },
];

export function listPacks(): PackListing[] {
    return BUILTIN_PACKS;
}

export function getPackListing(id: string): PackListing | undefined {
    const packs = listPacks();
    return packs.find((v) => v.id === id);
}
