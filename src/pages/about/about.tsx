import { ButtonColumn, LinkButton } from "@/components/Elements";
import HomeLayout from "@/components/HomeLayout";

export default function AboutPage() {
    return (
        <HomeLayout>
            <ButtonColumn>
                <LinkButton href="/about/credits">Credits</LinkButton>
                <LinkButton href="/about/changelog">Change Log</LinkButton>
                <LinkButton href="/about/tos">Terms of Service</LinkButton>
                <LinkButton href="/about/privacy">Privacy Policy</LinkButton>
                <LinkButton href="/about/gdpr">GDPR</LinkButton>
            </ButtonColumn>
            <LinkButton href="/">Back</LinkButton>
        </HomeLayout>
    );
}
