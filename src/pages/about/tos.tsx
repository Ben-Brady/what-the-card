import classNames from "@/lib/classnames.ts";
import { tosPolicy } from "@/assets/about/tos";

export default function TermsOfServicePage() {
    return (
        <div class={classNames("w-full h-screen p-8 overflow-y-auto")}>
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <p class="text-neutral-900" innerHTML={tosPolicy} />
        </div>
    );
}
