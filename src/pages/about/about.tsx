import { LinkButton } from "@/components/Elements";
import HomeLayout from "@/components/HomeLayout";

export default function AboutPage() {
    return (
        <HomeLayout depth="2">
            <div class="size-full flex flex-col items-center gap-4">
                <LinkButton href="/about/credits" preload>
                    Credits
                </LinkButton>
                <LinkButton href="/about/tos" preload>
                    Terms of Service
                </LinkButton>
                <LinkButton href="/about/privacy" preload>
                    Privacy Policy
                </LinkButton>
                <LinkButton href="/about/gdpr" preload>
                    GDPR
                </LinkButton>
            </div>
            <LinkButton href="/" preload>
                Back
            </LinkButton>
        </HomeLayout>
    );
}
