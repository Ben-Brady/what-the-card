import type { Config } from "tailwindcss";
import { utilitiesPlugin } from "./src/styles/plugin/utilities";

const spacing = (number: number) => `${number / 4}rem`;

const config: Config = {
    plugins: [utilitiesPlugin()],
};

export default config;
