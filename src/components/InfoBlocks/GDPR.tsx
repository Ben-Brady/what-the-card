import { gdprPolicy } from "@/assets/about/gdpr";

export default function GDPR() {
    // eslint-disable-next-line solid/no-innerhtml
    return <p class="text-neutral-900" innerHTML={gdprPolicy} />;
}
