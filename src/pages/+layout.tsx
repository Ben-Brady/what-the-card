import PWABadge from "../components/PWABridge/PWABadge";
import { RouteSectionProps } from "@solidjs/router";

export default function Layout({ children }: RouteSectionProps) {
    return (
        <>
            <PWABadge />
            {children}
        </>
    );
}
