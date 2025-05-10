import { createSignal, Index } from "solid-js";
import { Card } from "../lib/pack";
import { Button, Input } from "../components/Elements";
import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { createEditModal } from "../components/Modals/EditCardModal";
import { createConfirmationModal } from "../components/Modals/ConfirmModal";
import { setCustomPack } from "../lib/custom-packs";
import { createStore, Store } from "solid-js/store";
import { For } from "solid-js";

const DEFAULT_CARDS = [
    {
        title: "Staring competition",
        description:
            "Have a staring competition with the person in front of you, the loser must drink",
    },
    {
        title: "Only the Good Die Young",
        description: "The youngest player must drink",
    },
    {
        title: "Waht?",
        description: "If yuo cna raed tihs tehn dinrk",
    },
    {
        title: "Rich Kid",
        description: "The person who's been to the most countries must drink twice",
    },
    {
        title: "Group Joker",
        description: "Tell a joke and if anybody laughs, everyone must drink",
    },
    {
        title: "Rockstars",
        description: "Anyone who has ever dyed their hair must drink",
    },
    {
        title: "Turning a Blind Eye",
        description: "The next person who makes eye contact with you must drink",
    },
    {
        title: "2 Turths, 1 Lie",
        description:
            "You have to tell 2 truths and one lie.\nYou don't have to say which ones the lie",
    },
    {
        title: "Double Up",
        description: "Anyone who drinks without being forced to has to drink again",
    },
    {
        title: "Generous Lovers",
        description: 'Anybody who has ever "given head" must drink',
    },
    {
        title: "Dress to Impress",
        description: "Whoever is dressed best, they they must drink",
    },
    {
        title: "BFFs forever",
        description: "High five the player to your right, take a selfie, then both drink",
    },
    {
        title: "How many colours?",
        description:
            "Go round clockwise a circle and name a colour.\nIf you can't think of a colour or repeat one, you must drink",
    },
    {
        title: "Upside Down",
        description:
            "Turn upside down on your seat and try your best to take a sip.\nIf you can't you have to drink twice",
    },
    {
        title: "Drink",
        description: "Just drink, it's as simple as that",
    },
    {
        title: "Job Interview",
        description: "Pick a person and pretend to interview for a job with them",
    },
    {
        title: "Our Drink",
        description: "Everyone is allow to contribute to a bit to your drink",
    },
    {
        title: "No Smoking!",
        description: "If someone has already gone for a smoke break, they must drink",
    },
    {
        title: "Blackjack",
        description: "Starting with you going clockwise, every player must count up the previous?",
    },
    {
        title: "Pizza or Burger",
        description:
            "Everyone choose which side they prefer, pizza or burgers, the smallest side must all drink",
    },
    {
        title: "Truth or Dare",
        description: "Play one round of Truth or Dare",
    },
    {
        title: "Hands Free",
        description: "Take a tip without using your hands",
    },
    {
        title: "Swapsies",
        description: "Choose a player to phones with 30 seconds",
    },
    {
        title: "no nativo",
        description: "You can't speak your native language for the next round",
    },
    {
        title: "Cats or Dogs",
        description:
            "Everyone vote if they prefer dogs or cats, the side with the least votes must drink",
    },
    {
        title: "You know my name right?",
        description:
            "Go round clockwise pointing at every player and saying their name.\nDrink for every name you don't know",
    },
    {
        title: "Most Kinky",
        description: "Everyone votes for the player whos is the most kinky, they have to drink",
    },
    {
        title: "Alcoholics",
        description: "Anyone drinking something stronger than 10% must drink",
    },
    {
        title: "The Floor is Lava",
        description: "You cannot touch for floor for the until the next round",
    },
    {
        title: "Hungry?",
        description: "The person who has gone the longest without eating must drink",
    },
];

export default function CreatePage() {
    const [cards, setCards] = createStore<Card[]>(DEFAULT_CARDS);
    const [title, setTitle] = createSignal<string>("");
    const [changed, setChanged] = createSignal<boolean>(false);
    const [EditModal, modalControls] = createEditModal();
    const [ConfirmModal, prompt] = createConfirmationModal();
    const [parent] = createAutoAnimate(/* optional config */);

    const onSave = async () => {
        setChanged(false);
        setCustomPack(title(), cards);
    };

    const onDelete = async () => {
        const success = await prompt({
            title: "Are you sure?",
            subtitle: "Are you sure you want to delete this pack?",
        });
        console.log({ success });
        if (!success) return;
    };

    const openCardModal = (index: number) => {
        const card = cards[index];

        const onEdit = (card: Card) => {
            setChanged(true);
            setCards((cards) => cards.map((v, i) => (i === index ? card : v)));
        };

        const onDelete = () => {
            setChanged(true);
            console.log(`Deleting ${cards[index].title}`);
            setCards((cards) => {
                const newCards = cards.filter((_, i) => i !== index);
                console.log({ newCards });
                return newCards;
            });
        };

        modalControls.open(card, onEdit, onDelete);
    };

    const onAddNewCard = () => {
        const firstCard = cards[0];

        const isFirstCardBlank =
            firstCard && firstCard.title === "" && firstCard.description === "";

        if (!isFirstCardBlank) {
            setCards((cards) => [{ title: "", description: "" }, ...cards]);
        }

        openCardModal(0);
    };

    return (
        <div class="w-full h-fit px-8 py-4 flex flex-col">
            <div class="flex flex-col gap-3 mb-8">
                <Input
                    onChange={() => {
                        setTitle(title);
                        setChanged(true);
                    }}
                />
                <Button variant="primary" onClick={onSave} disabled={!changed()}>
                    Save
                </Button>
                <Button variant="primary" onClick={onDelete}>
                    Delete
                </Button>
            </div>
            <Button variant="primary" class="mb-4" onClick={onAddNewCard}>
                Create New Card
            </Button>

            <div class="grid cols-autofill-48 w-full h-fit gap-8" ref={parent}>
                <For each={cards}>
                    {(card, index) => (
                        <div
                            class="bg-sky-400 rounded-md px-2 py-4 w-full min-h-24 cursor-pointer flex flex-col justify-center"
                            role="button"
                            onClick={() => openCardModal(index())}
                        >
                            <p class="select-none w-full text-2xl text-center underline">
                                {card.title}
                            </p>
                            <p class="select-none w-full text-xl text-center whitespace-pre-line">
                                {card.description}
                            </p>
                        </div>
                    )}
                </For>
            </div>
            <ConfirmModal />
            <EditModal />
        </div>
    );
}
