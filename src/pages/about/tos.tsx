import classNames from "@/lib/classnames.ts";
import { tosPolicy } from "@/assets/about/tos";

export default function TermsOfServicePage() {
    return (
        <div class={classNames("w-full h-screen p-8 overflow-y-auto")}>
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <div class="text-black p-4 rounded-md">
                <p innerHTML={tosPolicy} />
            </div>
        </div>
    );
}
