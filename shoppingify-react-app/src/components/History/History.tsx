import React from "react";
import Today from '@material-ui/icons/Today';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';

import { useStore } from "../../store/useStore";
import css from "./History.module.css";
import { ListStatus } from "../../common/data";
import { coClass } from "../../common/functions";

export const History = () => {
    const [appState, dispatch] = useStore("History", "list");

    const lists = appState.list.lists;

    return (
        <div className={css.history}>

            <h2 className={css.header}>Shopping history</h2>

            <div className={css.content}>
                {
                    lists.map(l =>
                        <div key={l.id} className={css.list}>
                            <div className={css.listName}>{l.name}</div>
                            <div className={css.listInfoContainer}>
                                <div className={css.listInfo}>
                                    <div className={css.listDate}>
                                        <Today style={{marginRight: "5px"}} />
                                        {l.createdDate.toString()}
                                    </div>
                                    <div className={coClass(css.listStatus, css[getListStatusString(l.status)])}>
                                        {getListStatusString(l.status)}
                                    </div>
                                    <div>
                                        <ArrowForward style={{color: "orange"}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
}

const getListStatusString = (status: ListStatus) => {
    switch (status) {
        case ListStatus.Active: return "active";
        case ListStatus.Canceled: return "cancelled";
        case ListStatus.Completed: return "completed";
        default: return "";
    }
}