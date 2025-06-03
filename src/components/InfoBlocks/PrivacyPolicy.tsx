import { privacyPolicy } from "@/assets/about/privacy";

export default function PrivacyPolicy() {
    // eslint-disable-next-line solid/no-innerhtml
    return <p class="text-neutral-900" innerHTML={privacyPolicy} />;
}
