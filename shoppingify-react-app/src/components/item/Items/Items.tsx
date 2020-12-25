import React from "react";
import Add from '@material-ui/icons/Add';

import { useStore } from "../../../store/useStore";
import css from "./Items.module.css";
import { Item } from "../../../models/item";
import { actionTypes as itemAT } from "../../../store/item";
import { actionTypes as commonAT } from "../../../store/common";
import { SideDrawerMode } from "../../../common/data";

export const Items = () => {
    const [appState, dispatch] = useStore("item");

    const itemsGroupedByCategoryName = appState.item.categoryNameToItems;
    const categoryNames = Object.keys(itemsGroupedByCategoryName);

    const openItemDetails = (item: Item): void => {
        dispatch({ type: itemAT.setItem, payload: item });
        dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ItemDetails });
        dispatch({ type: commonAT.openSidedrawer });
    };

    const renderItemsInCategory = (categoryName: string): React.ReactNode => {
        return itemsGroupedByCategoryName[categoryName].map(i =>
            <div onClick={() => openItemDetails(i)} className={css.categoryItem}>
                {i.name}
                <Add style={{ marginLeft: "10px" }} />
            </div>
        );
    };

    return (
        <div className={css.items}>
            {
                categoryNames.map(cn =>
                    <div className={css.category}>
                        <h4 className={css.categoryName}>{cn}</h4>
                        <div className={css.itemsInCategory}>
                            {renderItemsInCategory(cn)}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

