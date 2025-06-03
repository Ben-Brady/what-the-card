/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import Layout from "@/pages/+layout";
import HomePage from "@/pages/home";
import PlayPage from "@/pages/play";
import PacksPage from "@/pages/packs";
import CustomCardsPage from "@/pages/custom";
import PackPage from "@/pages/game/pack";
import GamePage from "@/pages/game/play";
import AboutPage from "@/pages/about/about";
import CreditsPage from "@/pages/about/credits";
import "./styles/index.css";

const TermsOfServicePage = lazy(() => import("@/pages/about/tos"));
const PrivacyPolicyPage = lazy(() => import("@/pages/about/privacy"));

render(
    () => (
        <Router root={Layout}>
            <Route path="*" component={HomePage} />
            <Route path="/play" component={PlayPage} />
            <Route path="/packs" component={PacksPage} />
            <Route path="/custom" component={CustomCardsPage} />

            {/* Game Pages */}
            <Route path="/game/play" component={GamePage} />
            <Route path="/game/pack/:id" component={PackPage} />

            {/* Abort Pages */}
            <Route path="/about" component={AboutPage} />
            <Route path="/about/credits" component={CreditsPage} />
            <Route path="/about/privacy" component={PrivacyPolicyPage} />
            <Route path="/about/tos" component={TermsOfServicePage} />
            <Route path="/about/gdpr" component={TermsOfServicePage} />
        </Router>
    ),
    document.getElementById("root")!,
);
