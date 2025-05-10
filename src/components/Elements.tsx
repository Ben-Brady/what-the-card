import { classed } from "@tw-classed/solid";

export const Button = classed.button(
    "content-center text-center px-4 py-2 rounded-lg text-2xl cursor-pointer disabled:opacity-60",
    {
        variants: {
            variant: {
                primary: "bg-blue-600",
                secondary: "bg-[#133f9e] text-[#ebf4ff]",
                destructive: "bg-red-500",
            },
        },
    },
);

export const LinkButton = classed.a(
    "content-center text-center px-4 py-2 rounded-lg text-2xl cursor-pointer",
    {
        variants: {
            variant: {
                primary: "bg-blue-600",
                secondary: "bg-[#133f9e] text-[#ebf4ff]",
            },
        },
    },
);

export const Input = classed.input(
    "px-2 py-1 text-xl h-fit bg-white rounded-md text-black outline-none",
);

export const Textarea = classed.textarea(
    "px-2 py-1 h-fit bg-white rounded-md text-black resize-none w-full outline-none",
);
