import { string, object, literal, union, lazy, array, InferOutput, optional } from "valibot";

export type Pack = InferOutput<typeof Pack>;
export const Pack = object({
    id: string(),
    title: string(),
    cards: lazy(() => array(Card)),
});

export type PackInfo = InferOutput<typeof PackInfo>;
export const PackInfo = object({
    id: string(),
    title: string(),
});

export type CardTag = InferOutput<typeof CardTag>;
export const CardTag = union([
    literal("4-players"),
    literal("horny"),
    literal("extreme"),
    literal("default"),
    literal("custom"),
]);

export type Card = InferOutput<typeof Card>;
export const Card = object({
    id: string(),
    title: optional(string()),
    text: string(),
    tags: optional(array(CardTag)),
});
