/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import Layout from "@/pages/+layout";
import HomePage from "@/pages/home";
import PlayPage from "@/pages/play";
import PacksPage from "@/pages/packs";
import CardsPage from "@/pages/cards";
import PackPage from "@/pages/game/pack";
import GamePage from "@/pages/game/play";
import AboutPage from "@/pages/about/about";
import ChangelogPage from "@/pages/about/changelog";
import TermsOfServicePage from "@/pages/about/tos";
import GDPRPage from "./pages/about/gdpr";
import PrivacyPolicyPage from "@/pages/about/privacy";
import CreditsPage from "@/pages/about/credits";
import "./styles/index.css";

render(
    () => (
        <Router root={Layout}>
            <Route path="*" component={HomePage} />
            <Route path="/play" component={PlayPage} />
            <Route path="/packs" component={PacksPage} />
            <Route path="/cards" component={CardsPage} />

            {/* Game Pages */}
            <Route path="/game/play" component={GamePage} />
            <Route path="/game/pack/:id" component={PackPage} />

            {/* Abort Pages */}
            <Route path="/about" component={AboutPage} />
            <Route path="/about/changelog" component={ChangelogPage} />
            <Route path="/about/credits" component={CreditsPage} />
            <Route path="/about/privacy" component={PrivacyPolicyPage} />
            <Route path="/about/tos" component={TermsOfServicePage} />
            <Route path="/about/gdpr" component={GDPRPage} />
        </Router>
    ),
    document.getElementById("root")!,
);
