/* @refresh reload */
import { render } from "solid-js/web";
import "./styles/index.css";
import { Route, Router } from "@solidjs/router";
import Layout from "./pages/+layout.tsx";
import HomePage from "./pages/home.tsx";
import GamePage from "./pages/pack.tsx";

const root = document.getElementById("root");

render(
    () => (
        <Router root={Layout}>
            <Route path="/pack/:id" component={GamePage} />
            <Route path="*" component={HomePage} />
        </Router>
    ),
    root!,
);
