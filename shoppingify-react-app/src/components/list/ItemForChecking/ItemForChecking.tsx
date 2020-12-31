import React from "react";

import { ListItem } from "../../../models/listItem";
import css from "./ItemForChecking.module.css";
import { PillButton } from "../../ui/PillButton/PillButton";
import { actionTypes as listAT } from "../../../store/list";
import { useStore } from "../../../store/useStore";
import { Checkbox } from "../../ui/Checkbox/Checkbox";
import { coClass } from "../../../common/functions";

export interface ItemForCheckingProps {
    item: ListItem;
}

export const ItemForChecking = (props: ItemForCheckingProps) => {
    const dispatch = useStore("ItemForChecking")[1];

    const item = props.item;

    const toggleItemCheck = (): void => {
        if (!item.isChecked) {
            dispatch({ type: listAT.checkItem, payload: item.item.id });
        } else {
            dispatch({ type: listAT.uncheckItem, payload: item.item.id });
        }
    };

    return (
        <div className={css.itemForChecking}>
            <div className={css.title}>
                <Checkbox
                    isChecked={item.isChecked}
                    style={{ marginRight: "10px" }}
                    onToggle={toggleItemCheck}
                />
                <h5 className={coClass(css.header, item.isChecked ? css.checkedHeader : null)}>
                    {item.item.name}
                </h5>
            </div>

            <div className={css.content}>
                <PillButton text={`${item.amount} pcs`} />
            </div>
        </div>
    );
}

