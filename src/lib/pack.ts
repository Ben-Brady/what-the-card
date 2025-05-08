import BrutalHangoverUrl from "../data/brutal-hangover.json?url";
import DrunkPiratesJson from "../data/drunk-pirates.json?url";
import NeverendingTrashJson from "../data/neverending-trash.json?url";
import { string, object, literal, lazy, array, InferOutput, parse } from "valibot";

export type Pack = InferOutput<typeof Pack>;
export const Pack = object({
    id: string(),
    title: string(),
    type: literal("normal"),
    cards: lazy(() => array(CardSchema)),
});

export type PackInfo = InferOutput<typeof PackInfo>;
export const PackInfo = object({
    id: string(),
    title: string(),
});

export type CardSchema = InferOutput<typeof CardSchema>;
export const CardSchema = object({
    title: string(),
    description: string(),
});

export const packs = [
    { id: "brutal-hangover", title: "Brutal Hangover", url: BrutalHangoverUrl },
    { id: "drunk-pirates", title: "Drunk Pirates", url: DrunkPiratesJson },
    { id: "neverending-trash", title: "Neverending Trash", url: NeverendingTrashJson },
];

export function doesPackExist(id: string): boolean {
    return !!packs.find((v) => v.id === id);
}

export async function getPack(id: string): Promise<Pack> {
    const pack = packs.find((v) => v.id === id);
    if (!pack) throw new Error("invalid pack");
    const r = await fetch(pack.url);
    const json = await r.json();
    return parse(Pack, json);
}
