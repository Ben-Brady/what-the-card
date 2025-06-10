import classNames from "@/lib/classnames";
import { Card } from "@/lib/schema";

const CardComponent = (props: { class?: string; card: Card; onClick: () => void }) => {
    const tags = () => (props.card.tags ? props.card.tags : []);

    return (
        <button
            id={props.card.id}
            onClick={() => props.onClick()}
            class={
                "w-full h-fit px-2 py-4 " +
                "flex flex-col justify-center " +
                "bg-blue-600 rounded-md cursor-pointer " +
                (props.class ?? "")
            }
        >
            <p class="w-full text-2xl text-center underline">{props.card.title}</p>
            <div class="flex gap-2 w-full justify-center italic">
                <span class={classNames("italic", !tags().includes("4-players") && "hidden")}>
                    4+ Players
                </span>
                <span class={classNames("italic", !tags().includes("horny") && "hidden")}>
                    Horny
                </span>
                <span class={classNames("italic", !tags().includes("extreme") && "hidden")}>
                    Extreme
                </span>
            </div>
            <p class="w-full text-xl text-center overflow-ellipsis wrap-anywhere overflow-hidden">
                {props.card.text}
            </p>
        </button>
    );
};

export default CardComponent;
