import { useOnTap } from "../hooks/useOnTap";

const createTapElement = ({ x, y }: { x: number; y: number }) => {
    const element = (
        <div
            class="animate-tap-circle rounded-full bg-white z-50 fixed size-12 outline-1 outline-transparent -translate-1/2"
            style={{
                left: `${x}px`,
                top: `${y}px`,
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
