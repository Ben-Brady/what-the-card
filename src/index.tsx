/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import Layout from "./pages/+layout.tsx";
import HomePage from "./pages/home.tsx";
import GamePage from "./pages/pack.tsx";
import CreatePage from "./pages/create.tsx";
import "./styles/index.css";

const root = document.getElementById("root");

render(
    () => (
        <Router root={Layout}>
            <Route path="*" component={HomePage} />
            <Route path="/create" component={CreatePage} />
            <Route path="/pack/:id" component={GamePage} />
        </Router>
    ),
    root!,
);
