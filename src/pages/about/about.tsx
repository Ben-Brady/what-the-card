import { ButtonColumn, LinkButton } from "@/components/Elements";
import HomeLayout from "@/components/HomeLayout";

export default function AboutPage() {
    return (
        <HomeLayout>
            <ButtonColumn>
                <LinkButton href="/about/credits" preload>
                    Credits
                </LinkButton>
                <LinkButton href="/about/changelog" preload>
                    Change Log
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
            </ButtonColumn>
            <LinkButton href="/" preload>
                Back
            </LinkButton>
        </HomeLayout>
    );
}
