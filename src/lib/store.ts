import { Accessor, createSignal } from "solid-js";
import * as v from "valibot";

export function createSchemaStore<
    TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>({
    key,
    schema,
    defaultValue,
}: {
    key: string;
    schema: TSchema;
    defaultValue: v.InferOutput<TSchema>;
}): [Accessor<v.InferOutput<TSchema>>, (newValue: v.InferOutput<TSchema>) => void] {
    type TValue = v.InferOutput<TSchema>;

    const load = (): TValue => {
        const json = localStorage.getItem(key);
        if (!json) return defaultValue;
        const data = JSON.parse(json);
        const value = v.parse(schema, data);
        return value;
    };

    const save = (value: TValue) => {
        const data = v.parse(schema, value);
        const json = JSON.stringify(data);
        localStorage.setItem(key, json);
    };

    const [value, setValue] = createSignal<TValue>(load());

    const set = (value: TValue) => {
        setValue(() => value);
        save(value);
    };

    return [value, set] as const;
}
