import classNames from "@/lib/classnames.ts";
import { LinkButton } from "@/components/Elements.tsx";

export default function AboutPage() {
    return (
        <div
            class={classNames(
                "size-full p-8 overflow-y-auto",
                "flex flex-col items-center justify-between gap-4",
            )}
        >
            <div class="size-full flex flex-col items-center gap-4">
                <LinkButton variant="secondary" href="/credits" preload>
                    Credits
                </LinkButton>
                <LinkButton variant="secondary" href="/tos" preload>
                    Terms of Service
                </LinkButton>
                <LinkButton variant="secondary" href="/privacy" preload>
                    Privacy Policy
                </LinkButton>
                <LinkButton variant="secondary" href="/gdpr" preload>
                    GDPR
                </LinkButton>
            </div>
            <LinkButton variant="primary" href="/" preload>
                Back
            </LinkButton>
        </div>
    );
}
