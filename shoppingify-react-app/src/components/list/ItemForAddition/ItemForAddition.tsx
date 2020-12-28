import React from "react";
import Delete from '@material-ui/icons/DeleteOutline';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';

import { ListItem } from "../../../models/listItem";
import css from "./ItemForAddition.module.css";
import { PillButton } from "../../ui/PillButton/PillButton";
import { coClass } from "../../../common/functions";
import { actionTypes as listAT } from "../../../store/list";
import { useStore } from "../../../store/useStore";

export interface ItemForAdditionProps {
    item: ListItem;
}

export const ItemForAddition = (props: ItemForAdditionProps) => {
    const [appState, dispatch] = useStore();
    const [isEditing, setIsEditing] = React.useState(false);

    const item = props.item;

    const deleteFromList = (): void => {
        dispatch({ type: listAT.deleteItemFromList, payload: item });
    };

    const increaseAmount = (): void => {
        dispatch({ type: listAT.increaseItemCount, payload: item.item.id });
    };

    const decreaseAmount = (): void => {
        if (item.amount > 1) {
            dispatch({ type: listAT.decreaseItemCount, payload: item.item.id });
        }
    };

    const toggleMode = (): void => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={css.itemForAddition}>
            <h5 className={css.header}>{item.item.name}</h5>

            <div className={coClass(css.content, isEditing ? css.editing : null)}>
                {
                    isEditing &&
                    <div className={css.deleteContainer} onClick={deleteFromList}>
                        <Delete />
                    </div>
                }

                {
                    isEditing &&
                    <div onClick={decreaseAmount}>
                        <Remove style={{ color: "orange" }} />
                    </div>
                }

                <PillButton text={`${item.amount} pcs`} onClick={toggleMode} />

                {
                    isEditing &&
                    <div onClick={increaseAmount}>
                        <Add style={{ color: "orange" }} />
                    </div>
                }
            </div>
        </div>
    );
}

