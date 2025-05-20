import { RouteSectionProps } from "@solidjs/router";
import TapDisplay from "@/components/TapDisplay/TapDisplay";
import { usePWAUpdate } from "@/hooks/usePWAUpdate";

export default function Layout(props: RouteSectionProps) {
    usePWAUpdate();

    return (
        <>
            <TapDisplay />
            {props.children}
        </>
    );
}
