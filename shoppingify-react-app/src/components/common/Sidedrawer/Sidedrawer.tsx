import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { coClass } from "../../../common/functions";
import { useStore } from "../../../store/useStore";

import css from "./Sidedrawer.module.css";

export const Sidedrawer = () => {
    const [appState, dispatch] = useStore();

    return (
        <div className={coClass(css.sidedrawer, appState.isSideDrawerOpened ? css.opened : null)}>
            sidedrawer
        </div>
    );
}

