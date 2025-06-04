import HomeLayout from "@/components/HomeLayout";
import { LinkButton } from "@/components/Elements";
import { lazy } from "solid-js";

const TosPolicy = lazy(() => import("@/components/InfoBlocks/Tos"));

export default function TermsOfServicePage() {
    return (
        <HomeLayout>
            <LinkButton href="/about">
                Back
            </LinkButton>

            <TosPolicy />
        </HomeLayout>
    );
}
