import { tosPolicy } from "@/assets/about/tos";
import HomeLayout from "@/components/HomeLayout";
import { LinkButton } from "@/components/Elements";

export default function TermsOfServicePage() {
    return (
        <HomeLayout depth="3">
            <LinkButton variant="secondary" href="/about" preload>
                Back
            </LinkButton>
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <p class="text-neutral-900" innerHTML={tosPolicy} />
        </HomeLayout>
    );
}
