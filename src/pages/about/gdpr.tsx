import { gdprPolicy } from "@/assets/about/gdpr";
import HomePageLayout from "@/components/ComponentPage";
import { LinkButton } from "@/components/Elements";

export default function GDPRPage() {
    return (
        <HomePageLayout>
            <LinkButton variant="secondary" href="/" preload>
                Back
            </LinkButton>
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <p class="text-neutral-900" innerHTML={gdprPolicy} />
        </HomePageLayout>
    );
}
