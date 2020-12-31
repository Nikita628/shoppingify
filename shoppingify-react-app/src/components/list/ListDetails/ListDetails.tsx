import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../../../store/useStore";
import Back from '@material-ui/icons/KeyboardBackspace';
import Today from '@material-ui/icons/Today';

import css from "./ListDetails.module.css";
import { formatDate } from "../../../common/functions";

export const ListDetails = () => {
    const appState = useStore("ListDetails", "list")[0];
    const params = useParams<{ listId: string }>();
    const history = useHistory();

    const list = appState.list.lists.find(l => l.id === params.listId);

    if (!list) return null;

    return (
        <div className={css.listDetails}>
            <div className={css.backContainer}>
                <button onClick={() => history.push("/history")} className={css.back}><Back /> back</button>
            </div>

            <h3 className={css.listName}>{list.name}</h3>

            <div className={css.listDate}>
                <Today style={{ marginRight: "5px" }} />
                {formatDate(list.createdDate)}
            </div>

            <div className={css.listItems}>
                {
                    list.items.map(i =>
                        <div className={css.item}>
                            <span className={css.itemName}>{i.item.name}</span>
                            <span className={css.itemAmount}>{`${i.amount} pcs`}</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

