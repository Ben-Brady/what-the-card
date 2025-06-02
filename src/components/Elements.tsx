import { classed } from "@tw-classed/solid";

export const Button = classed.button(
    "w-full content-center text-center px-4 py-2 rounded-lg text-2xl cursor-pointer disabled:opacity-60 min-h-14 h-fit",
    {
        variants: {
            variant: {
                primary: "bg-blue-600",
                secondary: "bg-blue-500",
                destructive: "bg-red-500",
            },
            width: {
                constrained: "max-w-80",
                full: "",
            },
        },
        defaultVariants: {
            width: "constrained",
        },
    },
);

export const LinkButton = classed.a(
    "w-full max-w-80 content-center text-center px-4 py-2 rounded-lg text-2xl cursor-pointer min-h-14 h-fit",
    {
        variants: {
            variant: {
                primary: "bg-blue-600",
                secondary: "bg-blue-500",
            },
        },
    },
);

export const ButtonColumn = classed.div("w-full flex flex-col items-center gap-4");

export const Textarea = classed.textarea(
    "px-2 py-1 h-fit bg-white rounded-md text-black resize-none w-full outline-none",
);

export const Input = classed.input(
    "px-2 py-1 text-xl h-fit bg-white rounded-md text-black outline-none",
);
