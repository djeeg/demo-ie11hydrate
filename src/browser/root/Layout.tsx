import * as React from "react";
import { Route } from "react-router-dom";
import { default as Index } from "./Index";
import {Redirect, Switch} from "react-router";

class Layout extends React.Component<{}, {}> {
    render() {
        let result = (
            <div>
                <Switch>
                    <Route exact={true} path="/" component={Index} />
                </Switch>
            </div>
        );
        return result;
    }
}

export default Layout;
