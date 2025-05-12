/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import Layout from "./pages/+layout.tsx";
import HomePage from "./pages/home.tsx";
import GamePage from "./pages/pack.tsx";
import CreatePage from "./pages/create.tsx";
import PlayPage from "./pages/play.tsx";
import PacksPage from "./pages/packs.tsx";
import "./styles/index.css";

const AboutPage = lazy(() => import("./pages/about/about.tsx"));
const TermsOfServicePage = lazy(() => import("./pages/about/tos.tsx"));
const PrivacyPolicyPage = lazy(() => import("./pages/about/privacy.tsx"));

render(
    () => (
        <Router root={Layout}>
            <Route path="*" component={HomePage} />
            <Route path="/play" component={PlayPage} />
            <Route path="/create" component={CreatePage} />
            <Route path="/packs" component={PacksPage} />
            <Route path="/pack/:id" component={GamePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/privacy" component={PrivacyPolicyPage} />
            <Route path="/tos" component={TermsOfServicePage} />
            <Route path="/gdpr" component={TermsOfServicePage} />
        </Router>
    ),
    document.getElementById("root")!,
);
