import React from "react";

import { useStore } from "../../../store/useStore";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Toggle } from "../../ui/Toggle/Toggle";
import css from "./List.module.css";
import bottle from "../../../assets/bottle.png";
import { actionTypes as commonAT } from "../../../store/common";
import { SideDrawerMode } from "../../../common/data";

export interface ListProps {

}

export const List = (props: ListProps) => {
    const [appState, dispatch] = useStore();

    const switchToItemCreation = (): void => {
        dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ItemCreation });
    }

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
                    <h3>Shopping List</h3>
                    <Toggle isOn={false} onToggle={() => { }} />
                </div>

                <div className={css.content}>
                    <strong className={css.noItems}>No items</strong>
                </div>
            </div>

            <div className={css.footer}>
                <form className={css.saveForm}>
                    <Input type="text" styleType="secondary" placeholder="Enter a name" />
                    <Button type="secondary">Save</Button>
                </form>
            </div>
        </div>
    );
}

