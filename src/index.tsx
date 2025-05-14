/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import Layout from "@/pages/+layout.tsx";
import HomePage from "@/pages/home.tsx";
import PlayPage from "@/pages/play.tsx";
import PacksPage from "@/pages/packs.tsx";
import PackPage from "@/pages/game/pack.tsx";
import GamePage from "@/pages/game/play.tsx";
import AboutPage from "@/pages/about/about.tsx";
import CreditsPage from "@/pages/about/credits.tsx";
import "./styles/index.css";

const CreatePage = lazy(() => import("@/pages/create.tsx"));
const TermsOfServicePage = lazy(() => import("@/pages/about/tos.tsx"));
const PrivacyPolicyPage = lazy(() => import("@/pages/about/privacy.tsx"));

render(
    () => (
        <Router root={Layout}>
            <Route path="*" component={HomePage} />
            <Route path="/play" component={PlayPage} />
            <Route path="/packs" component={PacksPage} />
            <Route path="/create" component={CreatePage} />

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
