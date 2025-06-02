import classNames from "@/lib/classnames";
import { Accessor, createSignal, Show } from "solid-js";
import { effect } from "solid-js/web";

type CheckboxProps = {
    name?: string;
    value: Accessor<boolean>;
    onChange: (value: boolean) => void;
};

export const Checkbox = (props: CheckboxProps) => {
    return (
        <>
            <Show when={props.name}>
                <input
                    type="hidden"
                    name={props.name}
                    value={props.value() === true ? "true" : "false"}
                />
            </Show>
            <button
                class="size-10 border-4 border-blue-500 rounded-lg cursor-pointer bg-white overflow-clip flex items-center justify-center"
                onClick={(e) => {
                    e.preventDefault();

                    props.onChange(!props.value());
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    class={classNames(
                        "size-6 text-neutral-900",
                        props.value() ? "opacity-100" : "opacity-0",
                    )}
                    style={{ transition: "opacity ease-in 50ms" }}
                >
                    <path
                        fill="currentColor"
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    />
                </svg>
            </button>
        </>
    );
};
