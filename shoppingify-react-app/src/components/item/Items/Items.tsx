import React from "react";
import Add from '@material-ui/icons/Add';

import { useStore } from "../../../store/useStore";
import css from "./Items.module.css";
import { Item } from "../../../models/item";
import { actionTypes as itemAT } from "../../../store/item";
import { actionTypes as commonAT } from "../../../store/common";
import { SideDrawerMode } from "../../../common/data";
import { coClass } from "../../../common/functions";

export const Items = () => {
    const [appState, dispatch] = useStore("Items", "item");

    const itemsGroupedByCategoryName = appState.item.categoryNameToItems;
    const categoryNames = Object.keys(itemsGroupedByCategoryName).sort();
    const currentItem = appState.item.item;

    const openItemDetails = (item: Item): void => {
        dispatch({ type: itemAT.setItem, payload: item });
        dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ItemDetails });
        dispatch({ type: commonAT.openSidedrawer });
    };

    const renderItemsInCategory = (categoryName: string): React.ReactNode => {
        return itemsGroupedByCategoryName[categoryName].map(i =>
            <div
                onClick={() => openItemDetails(i)}
                className={coClass(css.categoryItem, currentItem && currentItem.id === i.id ? css.selectedItem : null)}
                key={i.id}
            >
                {i.name}
                <Add style={{ marginLeft: "10px" }} />
            </div>
        );
    };

    return (
        <div className={css.items}>
            <h2 className={css.header}>Your items</h2>
            {
                categoryNames.map(cn =>
                    <div key={cn} className={css.category}>
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

