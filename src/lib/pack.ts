import { string, object, literal, lazy, array, InferOutput, parse } from "valibot";
import WhatTheCardURL from "../assets/packs/what-the-card.json?url";
import BrutalHandoverURL from "../assets/packs/brutal-hangover.json?url";
import DrunkPirateURL from "../assets/packs/drunk-pirates.json?url";
import NeverendingTrashURL from "../assets/packs/neverending-trash.json?url";
import { listCustomPacks } from "./custom-packs";

export type Pack = InferOutput<typeof Pack>;
export const Pack = object({
    id: string(),
    title: string(),
    type: literal("normal"),
    cards: lazy(() => array(Card)),
});

export type PackInfo = InferOutput<typeof PackInfo>;
export const PackInfo = object({
    id: string(),
    title: string(),
});

export type Card = InferOutput<typeof Card>;
export const Card = object({
    title: string(),
    description: string(),
});

export type PackListing = {
    id: string;
    title: string;
    getData: () => Promise<Pack>;
};

const createDownloadFunc = (url: string) => async (): Promise<Pack> => {
    const r = await fetch(url);
    const json = await r.json();
    return parse(Pack, json);
};

const BUILTIN_PACKS: PackListing[] = [
    {
        id: "what-the-cards",
        title: "What The Card",
        getData: createDownloadFunc(WhatTheCardURL),
    },
    {
        id: "brutal-hangover",
        title: "Brutal Hangover",
        getData: createDownloadFunc(BrutalHandoverURL),
    },
    {
        id: "drunk-pirates",
        title: "Drunk Pirates",
        getData: createDownloadFunc(DrunkPirateURL),
    },
    {
        id: "neverending-trash",
        title: "Neverending Trash",
        getData: createDownloadFunc(NeverendingTrashURL),
    },
];

export const CUSTOM_PACK_ID = "custom";

export function listPacks(): PackListing[] {
    const customPacks = listCustomPacks();
    return BUILTIN_PACKS.concat(customPacks);
}

export function getPackListing(id: string): PackListing | undefined {
    const packs = listPacks();
    return packs.find((v) => v.id === id);
}
