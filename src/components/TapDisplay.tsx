import { useOnTap } from "../hooks/useOnTap";

const createTapElement = (props: { x: number; y: number }) => {
    const element = (
        <div
            class="animate-tap-circle rounded-full bg-white z-50 fixed size-12 outline-1 outline-transparent -translate-1/2"
            style={{
                left: `${props.x}px`,
                top: `${props.y}px`,
            }}
            onAnimationEnd={(e) => e.currentTarget.remove()}
        />
    );

    document.body.appendChild(element as Element);
};

export default function TapDisplay() {
    useOnTap(createTapElement);
    return null;
}
