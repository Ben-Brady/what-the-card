import { Game } from "./components/Game.tsx";
import PWABadge from "./components/PWABridge/PWABadge.tsx";

function App() {
    return (
        <>
            <PWABadge />
            <Game />
        </>
    );
}

export default App;
