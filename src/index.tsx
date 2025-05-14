/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import Layout from "@/pages/+layout.tsx";
import HomePage from "@/pages/home.tsx";
import PackPage from "@/pages/game/pack.tsx";
import PlayPage from "@/pages/play.tsx";
import PacksPage from "@/pages/packs.tsx";
import CreditsPage from "@/pages/about/credits.tsx";
import "./styles/index.css";

const CreatePage = lazy(() => import("@/pages/create.tsx"));
const AboutPage = lazy(() => import("@/pages/about/about.tsx"));
const TermsOfServicePage = lazy(() => import("@/pages/about/tos.tsx"));
const PrivacyPolicyPage = lazy(() => import("@/pages/about/privacy.tsx"));
const GamePage = lazy(() => import("@/pages/game/play.tsx"));

render(
    () => (
        <Router root={Layout}>
            <Route path="*" component={HomePage} />
            <Route path="/play" component={PlayPage} />
            <Route path="/packs" component={PacksPage} />
            <Route path="/create" component={CreatePage} />

            {/* Game Pages */}
            <Route path="/game/pack/:id" component={PackPage} />
            <Route path="/game/play" component={GamePage} />

            {/* Abort Pages */}
            <Route path="/about" component={AboutPage} />
            <Route path="/privacy" component={PrivacyPolicyPage} />
            <Route path="/tos" component={TermsOfServicePage} />
            <Route path="/gdpr" component={TermsOfServicePage} />
            <Route path="/credits" component={CreditsPage} />
        </Router>
    ),
    document.getElementById("root")!,
);
