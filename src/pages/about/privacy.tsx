import classNames from "@/lib/classnames.ts";
import { privacyPolicy } from "@/assets/about/privacy";

export default function PrivacyPolicyPage() {
    return (
        <div class={classNames("w-full h-screen p-8 overflow-y-auto")}>
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <p class="text-neutral-900" innerHTML={privacyPolicy} />
        </div>
    );
}
