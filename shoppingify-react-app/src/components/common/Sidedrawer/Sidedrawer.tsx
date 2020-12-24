import React from "react";
import { SideDrawerMode } from "../../../common/data";
import { coClass } from "../../../common/functions";
import { useStore } from "../../../store/useStore";
import { ItemCreation } from "../../item/ItemCreation/ItemCreation";
import { ItemDetails } from "../../item/ItemDetails/ItemDetails";
import { List } from "../../list/List/List";

import css from "./Sidedrawer.module.css";

export const Sidedrawer = () => {
    const appState = useStore("common")[0];
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
        case SideDrawerMode.ItemDetails:
            return <ItemDetails />;
        default:
            return <List />;
    }
}
