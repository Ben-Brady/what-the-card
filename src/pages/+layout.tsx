import { RouteSectionProps } from "@solidjs/router";
import PWABadge from "@/components/PWABridge/PWABadge";
import TapDisplay from "@/components/TapDisplay";

export default function Layout(props: RouteSectionProps) {
    return (
        <>
            <TapDisplay />
            <PWABadge />
            {props.children}
        </>
    );
}
