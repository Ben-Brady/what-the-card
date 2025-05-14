import { LinkButton } from "@/components/Elements.tsx";
import HomePageLayout from "@/components/ComponentPage";

export default function AboutPage() {
    return (
        <HomePageLayout>
            <div class="size-full flex flex-col items-center gap-4">
                <LinkButton variant="secondary" href="/about/credits" preload>
                    Credits
                </LinkButton>
                <LinkButton variant="secondary" href="/about/tos" preload>
                    Terms of Service
                </LinkButton>
                <LinkButton variant="secondary" href="/about/privacy" preload>
                    Privacy Policy
                </LinkButton>
                <LinkButton variant="secondary" href="/about/gdpr" preload>
                    GDPR
                </LinkButton>
            </div>
            <LinkButton variant="primary" href="/" preload>
                Back
            </LinkButton>
        </HomePageLayout>
    );
}
