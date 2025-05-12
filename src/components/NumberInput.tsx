import { Input } from "./Elements";

type NumberInputProps = {
    class?: string;
    defaultValue?: number;
    onChange?: (value: number) => void;
};

const isNumber = (v: string) => /[0-9]/g.test(v);

export default function NumberInput(props: NumberInputProps) {
    return (
        <Input
            class={props.class}
            value={props.defaultValue ?? 0}
            onInput={(e) => {
                const value = Array.from(e.currentTarget.value).filter(isNumber).join("");
                e.currentTarget.value = value;
            }}
            onChange={(e) => {
                const number = parseInt(e.currentTarget.value);
                if (isNaN(number)) return;

                props?.onChange?.(number);
            }}
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
        />
    );
}
