import classNames from "@/lib/classnames";
import { ComponentProps } from "solid-js";

const VERSION = "1.2.0";

export default function HomeLayout(props: ComponentProps<"div">) {
    return (
        <div
            {...props}
            class={classNames(
                "size-full p-8 overflow-y-auto relative",
                "flex flex-col items-center justify-between gap-4",
                props.class,
            )}
        >
            <div class="absolute top-0 right-1 text-neutral-500">{VERSION}</div>
            {props.children}
        </div>
    );
}
