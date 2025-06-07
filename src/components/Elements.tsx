import { classed } from "@tw-classed/solid";

export const Button = classed.button(
    "w-full content-center text-center px-4 py-2 rounded-lg text-2xl cursor-pointer disabled:opacity-60 min-h-14 h-fit",
    {
        variants: {
            variant: {
                normal: "bg-blue-600",
                destructive: "bg-red-500",
                save: "bg-emerald-500",
            },
            width: {
                constrained: "max-w-80",
                full: "",
            },
        },
        defaultVariants: {
            variant: "normal",
            width: "constrained",
        },
    },
);

export const LinkButton = classed.a(
    "w-full max-w-80 h-fit min-h-14 content-center text-center px-4 py-2 rounded-lg text-2xl cursor-pointer bg-blue-600",
);

export const ButtonColumn = classed.div("w-full flex flex-col items-center gap-4");

export const Textarea = classed.textarea(
    "px-2 py-1 h-fit bg-white rounded-md text-black resize-none w-full outline-none",
);

export const Input = classed.input(
    "px-2 py-1 text-xl h-fit bg-white rounded-md text-black outline-none",
);
