import plugin from "tailwindcss/plugin";

export const utilitiesPlugin = () =>
    plugin(({ addUtilities, matchUtilities, theme }) => {
        matchUtilities(
            {
                "cols-autofit": (value) => ({
                    "grid-template-columns": `repeat(auto-fit, minmax(min(${value}, 100%), 1fr))`,
                }),
            },
            { values: theme("spacing") },
        );
        matchUtilities(
            {
                "cols-autofill": (value) => ({
                    "grid-template-columns": `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
                }),
            },
            { values: theme("spacing") },
        );
        matchUtilities(
            {
                "rows-autofit": (value) => ({
                    "grid-template-columns": `repeat(auto-fit, minmax(min(${value}, 100%), 1fr))`,
                }),
            },
            { values: theme("spacing") },
        );
        matchUtilities(
            {
                "rows-autofill": (value) => ({
                    "grid-template-rows": `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
                }),
            },
            { values: theme("spacing") },
        );

        addUtilities({
            ".flex-center": {
                "display": "flex",
                "justify-content": "center",
                "align-items": "center",
            },
            ".pixelated": {
                "image-rendering": "pixelated",
            },
        });
    });
