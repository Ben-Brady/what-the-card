import classNames from "@/lib/classnames.ts";
import { gdprPolicy } from "@/assets/about/gdpr";

export default function GDPRPage() {
    return (
        <div class={classNames("size-full p-8 overflow-y-auto")}>
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <p class="text-neutral-900" innerHTML={gdprPolicy} />
        </div>
    );
}
