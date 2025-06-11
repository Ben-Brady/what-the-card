import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

const manifest: Partial<ManifestOptions> = {
    name: "What the Card",
    short_name: "What the Card",
    description: "A fast-paced drinking card game for parties",
    theme_color: "#0a66c2",

    icons: [
        {
            src: "pwa.svg",
            sizes: "64x64",
            type: "image/svg+xml",
        },
        {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
        },
        {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
        },
        {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
        },
        {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
        },
    ],
};

// https://vitejs.dev/config/
export default defineConfig({
    resolve: { alias: { "@": "/src" } },
    server: {
        allowedHosts: ["six-suns-tap.loca.lt"],
    },
    plugins: [
        tailwindcss(),
        solid(),
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: false,
            manifest: manifest,

            workbox: {
                globPatterns: ["**/*.{js,css,html,svg,png,ico,json}"],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
            },

            devOptions: {
                enabled: false,
                navigateFallback: "index.html",
                suppressWarnings: true,
                type: "module",
            },
        }),
    ],
});
