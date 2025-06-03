import { tosPolicy } from "@/assets/about/tos";

export default function Tos() {
    // eslint-disable-next-line solid/no-innerhtml
    return <p class="text-neutral-900" innerHTML={tosPolicy} />;
}
