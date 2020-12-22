import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { SideDrawerMode } from "../../../common/data";
import { coClass } from "../../../common/functions";
import { useStore } from "../../../store/useStore";
import { ItemCreation } from "../../item/ItemCreation/ItemCreation";
import { List } from "../../list/List/List";

import css from "./Sidedrawer.module.css";

export const Sidedrawer = () => {
    const [appState, dispatch] = useStore();
    const commonState = appState.common;

    return (
        <div className={coClass(css.sidedrawer, commonState.isSideDrawerOpened ? css.opened : null)}>
            {chooseComponentToRender(commonState.sidedrawerMode)}
        </div>
    );
}

const chooseComponentToRender = (mode: SideDrawerMode): React.ReactNode => {
    switch (mode) {
        case SideDrawerMode.ItemCreation:
            return <ItemCreation />;
        default:
            return <List />;
    }
}
