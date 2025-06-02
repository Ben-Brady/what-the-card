import { privacyPolicy } from "@/assets/about/privacy";
import HomeLayout from "@/components/HomeLayout";
import { LinkButton } from "@/components/Elements";

export default function PrivacyPolicyPage() {
    return (
        <HomeLayout depth="3">
            <LinkButton href="/about" preload>
                Back
            </LinkButton>
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <p class="text-neutral-900" innerHTML={privacyPolicy} />
        </HomeLayout>
    );
}
