import { RouteSectionProps } from "@solidjs/router";
import PWABadge from "../components/PWABridge/PWABadge";
import TapDisplay from "../components/TapDisplay";

export default function Layout({ children }: RouteSectionProps) {
    return (
        <>
            <TapDisplay />
            <PWABadge />
            {children}
        </>
    );
}
