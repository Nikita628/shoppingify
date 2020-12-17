import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import css from "./Layout.module.css";
import { Items } from "../../item/Items/Items";
import { History } from "../../History/History";
import { Statistics } from "../../Statistics/Statistics";

export const Layout = () => {
    return (
        <div>
            <Switch>
                <Route path="/items" exact component={Items} />
                <Route path="/history" exact component={History} />
                <Route path="/statistics" exact component={Statistics} />
                <Route path="/" render={() => <Redirect to="/items" />} />
            </Switch>
        </div>
    );
}

