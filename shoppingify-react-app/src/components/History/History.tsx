import React from "react";
import { useStore } from "../../store/useStore";
import css from "./History.module.css";

export const History = () => {
    const [appState, dispatch] = useStore("History", "list");

    const lists = appState.list.lists;
    
    return (
        <div>
            <h3>History</h3>
            <div>
                {
                    lists.map(l => {
                        return <div>{l.name} | {l.createdDate.toString()}</div>
                    })
                }
            </div>
        </div>
    );
}