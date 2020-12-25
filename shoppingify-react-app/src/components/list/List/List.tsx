import React from "react";

import { useStore } from "../../../store/useStore";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Toggle } from "../../ui/Toggle/Toggle";
import css from "./List.module.css";
import bottle from "../../../assets/bottle.png";
import { actionTypes as commonAT } from "../../../store/common";
import { SideDrawerMode } from "../../../common/data";
import { coClass } from "../../../common/functions";
import { List as ListModel } from "../../../models/list";

export interface ListProps {

}

export const List = (props: ListProps) => {
    const [appState, dispatch] = useStore("all");

    const activeList: ListModel = appState.list.activeList;
    const itemsGroupedByCategory = appState.list.categoryNameToActiveListItems;
    const categoryNames = Object.keys(itemsGroupedByCategory);
    const isListHasItems = categoryNames.length;

    const switchToItemCreation = (): void => {
        dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ItemCreation });
    };

    // TODO render itemForAdding or itemForChecking (depends on list mode)
    const renderItemsInCategory = (categoryName: string): React.ReactNode => {
        return itemsGroupedByCategory[categoryName].map(i =>
            <div key={i.item.id}>{i.item.name}</div>
        );
    };

    const saveActiveList = (): void => {
        // TODO create or update
    };

    return (
        <div className={css.list}>

            <div className={css.body}>
                <div className={css.header}>
                    <img className={css.bottle} src={bottle} alt="bottle" />
                    <div>
                        <h5>Didn't find what you need?</h5>
                        <button className={css.addItemButton} onClick={switchToItemCreation}>Add Item</button>
                    </div>
                </div>

                <div className={css.title}>
                    {activeList && activeList.id ? activeList.name : <h3>Shopping List</h3>}
                    <Toggle isOn={false} onToggle={() => { }} />
                </div>

                <div className={coClass(css.content, !isListHasItems ? css.background : null)}>
                    {
                        isListHasItems
                            ? categoryNames.map(ic => renderItemsInCategory(ic))
                            : <strong className={css.noItems}>No items</strong>
                    }
                </div>
            </div>

            {/* render save or complete\cancel (depends on list mode) */}
            <div className={css.footer}>
                {
                    activeList && activeList.id
                        ? <Button type="primary" onClick={saveActiveList}>Save</Button>
                        : <form className={css.saveForm}>
                            <Input type="text" styleType="secondary" placeholder="Enter a name" />
                            <Button type="secondary" onClick={saveActiveList}>Save</Button>
                        </form>
                }
            </div>
        </div>
    );
}

