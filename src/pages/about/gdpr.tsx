import { gdprPolicy } from "@/assets/about/gdpr";
import HomeLayout from "@/components/HomeLayout";
import { LinkButton } from "@/components/Elements";

export default function GDPRPage() {
    return (
        <HomeLayout>
            <LinkButton variant="secondary" href="/" preload>
                Back
            </LinkButton>
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <p class="text-neutral-900" innerHTML={gdprPolicy} />
        </HomeLayout>
    );
}
