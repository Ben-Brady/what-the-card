import type { Config } from "tailwindcss";
import { utilitiesPlugin } from "./src/styles/plugin/utilities";

const config: Config = {
    plugins: [utilitiesPlugin()],
};

export default config;
