import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import css from "./Layout.module.css";
import { Items } from "../../item/Items/Items";
import { History } from "../../History/History";
import { Statistics } from "../../Statistics/Statistics";
import { Sidemenu } from "../Sidemenu/Sidemenu";
import { Sidedrawer } from "../Sidedrawer/Sidedrawer";
import { ListDetails } from "../../list/ListDetails/ListDetails";

export const Layout = () => {
    return (
        <div className={css.layout}>
            <Sidemenu />
            <div className={css.content}>
                <Switch>
                    <Route path="/items" exact component={Items} />
                    <Route path="/history" exact component={History} />
                    <Route path="/history/:listId" exact component={ListDetails} />
                    <Route path="/statistics" exact component={Statistics} />
                    <Route path="/" render={() => <Redirect to="/items" />} />
                </Switch>
            </div>
            <Sidedrawer />
        </div>
    );
}

