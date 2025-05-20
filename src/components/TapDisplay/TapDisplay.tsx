import { useOnTap } from "../../hooks/useOnTap";
import "./TapDisplay.css";

const createTapElement = (props: { x: number; y: number }) => {
    const element = document.createElement("div");
    element.inert = true;
    element.className =
        "animate-tap-circle rounded-full bg-white z-50 fixed size-12 outline-1 outline-transparent -translate-1/2 touch-none pointer-events-none";
    // eslint-disable-next-line solid/reactivity
    element.style.left = `${props.x}px`;
    // eslint-disable-next-line solid/reactivity
    element.style.top = `${props.y}px`;
    element.onanimationend = () => element.remove();
    document.body.appendChild(element);
};

export default function TapDisplay() {
    useOnTap(createTapElement);
    return null;
}
