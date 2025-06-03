import HomeLayout from "@/components/HomeLayout";
import { LinkButton } from "@/components/Elements";
import { lazy } from "solid-js";

const PrivacyPolicy = lazy(() => import("@/components/InfoBlocks/PrivacyPolicy"));

export default function PrivacyPolicyPage() {
    return (
        <HomeLayout>
            <LinkButton href="/about" preload>
                Back
            </LinkButton>
            <PrivacyPolicy />
        </HomeLayout>
    );
}
