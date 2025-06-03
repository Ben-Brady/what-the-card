import HomeLayout from "@/components/HomeLayout";
import { LinkButton } from "@/components/Elements";
import { lazy } from "solid-js";

const GDPR = lazy(() => import("@/components/InfoBlocks/GDPR"));

export default function GDPRPage() {
    return (
        <HomeLayout>
            <LinkButton href="/about" preload>
                Back
            </LinkButton>
            <GDPR />
        </HomeLayout>
    );
}
