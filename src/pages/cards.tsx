import { createSignal, Show } from "solid-js";
import HomeLayout from "@/components/HomeLayout";
import TabSelect from "@/components/TabSelect";
import BuiltinCards from "@/components/CardsPage/BuiltInCards";
import CustomCards from "@/components/CardsPage/CustomCards";
import { transition } from "@/lib/transition";
import classNames from "@/lib/classnames";
import { useBeforeLeave } from "@solidjs/router";

export default function CardsPage() {
    type Tab = "Built-in" | "Custom";
    const tabs: Tab[] = ["Built-in", "Custom"];
    const [currentTab, setCurrentTab] = createSignal<Tab>("Built-in");
    const [animation, setAnimation] = createSignal<"right" | "left" | "none">("none");

    useBeforeLeave(() => {
        setAnimation("none");
    });

    return (
        <>
            <HomeLayout>
                <TabSelect
                    currentTab={currentTab}
                    setTab={(v) => {
                        setAnimation(v === "Built-in" ? "left" : "right");
                        transition(() => setCurrentTab(v));
                    }}
                    tabs={tabs}
                    style={{
                        "view-transition-name":
                            animation() === "none" ? undefined : "cards-tab-select",
                    }}
                />

                <div
                    class={classNames(
                        "w-full flex flex-col items-center justify-between gap-4",
                        // TODO: fix this to use full, for some reason h-full doesn't work
                        "h-[calc(100%_-_5rem)]",
                        animation() === "right" && "transition-slide-right",
                        animation() === "left" && "transition-slide-left",
                    )}
                    style={{
                        "view-transition-name":
                            animation() === "none" ? undefined : "cards-content",
                    }}
                >
                    <Show when={currentTab() === "Built-in"}>
                        <BuiltinCards />
                    </Show>
                    <Show when={currentTab() === "Custom"}>
                        <CustomCards />
                    </Show>
                </div>
            </HomeLayout>
        </>
    );
}
