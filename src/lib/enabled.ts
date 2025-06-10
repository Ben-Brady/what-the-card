import * as v from "valibot";
import { Card } from "./schema";
import { createSchemaStore } from "./store";

const [disabledIds, setDisabledIds] = createSchemaStore({
    key: "disabled-ids",
    schema: v.array(v.string()),
    defaultValue: [],
});

export { disabledIds };

export const disableBuiltinCard = (card: Card) => {
    const ids = [...disabledIds(), card.id];
    setDisabledIds(ids);
};

export const enableBuiltinCard = (card: Card) => {
    const ids = disabledIds().filter((id) => card.id !== id);
    setDisabledIds(ids);
};
