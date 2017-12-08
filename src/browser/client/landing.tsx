import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "../root/Layout";

const component = (
    <BrowserRouter forceRefresh>
        <div id="router">
            <Layout />
        </div>
    </BrowserRouter>
);

ReactDOM.hydrate(component, document.getElementById("app"));
