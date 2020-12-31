import React from "react";
import Today from '@material-ui/icons/Today';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from "react-router-dom";

import { useStore } from "../../store/useStore";
import css from "./History.module.css";
import { ListStatus } from "../../common/data";
import { coClass, formatDate } from "../../common/functions";

export const History = () => {
    const appState = useStore("History", "list")[0];
    const history = useHistory();

    const lists = appState.list.lists;

    return (
        <div className={css.history}>

            <h2 className={css.header}>Shopping history</h2>

            <div className={css.content}>
                {
                    lists.map(l =>
                        <div key={l.id} className={css.list} onClick={() => history.push("/history/" + l.id)}>
                            <div className={css.listName}>{l.name}</div>
                            <div className={css.listInfoContainer}>
                                <div className={css.listInfo}>
                                    <div className={css.listDate}>
                                        <Today style={{marginRight: "5px"}} />
                                        {formatDate(l.createdDate)}
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
        case ListStatus.Cancelled: return "cancelled";
        case ListStatus.Completed: return "completed";
        default: return "";
    }
}