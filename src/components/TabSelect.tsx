import { Accessor, For, JSX } from "solid-js";

const toPercent = (v: number) => `${v * 100}%`;

export default function TabSelect<T extends string>(props: {
    style?: JSX.CSSProperties;
    currentTab: Accessor<T>;
    tabs: T[] | readonly T[];
    setTab: (tab: T) => void;
}) {
    const currentTabIndex = () => props.tabs.findIndex((v) => v === props.currentTab()) ?? 0;

    return (
        <div
            class="h-fit min-h-14 w-full relative rounded-lg overflow-clip text-2xl bg-blue-400"
            style={props.style}
        >
            <div
                class="absolute top-0 bottom-0 z-10 bg-blue-600 duration-250 ease-out"
                style={{
                    width: toPercent(1 / props.tabs.length),
                    left: toPercent((1 / props.tabs.length) * currentTabIndex()),
                }}
            />
            <div class="absolute inset-0 flex z-20">
                <For each={props.tabs}>
                    {(tab) => (
                        <button
                            class="px-4 py-2 size-full flex-1"
                            onClick={() => props.setTab(tab)}
                            disabled={props.currentTab() === tab}
                        >
                            {tab}
                        </button>
                    )}
                </For>
            </div>
        </div>
    );
}
