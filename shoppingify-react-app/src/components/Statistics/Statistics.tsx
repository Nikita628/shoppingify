import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

import { ListStatus } from "../../common/data";
import { useStore } from "../../store/useStore";
import css from "./Statistics.module.css";

export const Statistics = () => {
    const appState = useStore("Statistics", "list")[0];

    const lists = appState.list.lists;
    let cancelledListCount = 0;
    let completedListCount = 0;
    const topItems: { [name: string]: number } = {};
    const topCategories: { [name: string]: number } = {};

    for (const list of lists) {
        if (list.status === ListStatus.Cancelled) {
            cancelledListCount++;
        } else if (list.status === ListStatus.Completed) {
            completedListCount++;
        }

        for (const listItem of list.items) {
            if (topItems[listItem.item.name]) {
                topItems[listItem.item.name]++;
            } else {
                topItems[listItem.item.name] = 1;
            }

            if (topCategories[listItem.item.category.name]) {
                topCategories[listItem.item.category.name]++;
            } else {
                topCategories[listItem.item.category.name] = 1;
            }
        }
    }

    const topItemsArray = Object.keys(topItems)
        .map(k => ({ name: k, count: topItems[k] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    const topCategoriesArray = Object.keys(topCategories)
        .map(k => ({ name: k, count: topCategories[k] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return (
        <div className={css.statistics}>
            <h2 className={css.header}>Shopping Statistics</h2>

            <div className={css.listsCount}>
                <h4># lists cancelled: <span className={css.cancelledCount}>{cancelledListCount}</span></h4>
                <h4># lists completed: <span className={css.completedCount}>{completedListCount}</span></h4>
            </div>

            <div className={css.charts}>
                <div className={css.topItems}>
                    <h4>Top Items</h4>
                    <BarChart width={730} height={250} data={topItemsArray}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Legend />
                        <Bar dataKey="count" fill="orange" />
                    </BarChart>
                </div>

                <div className={css.topCategories}>
                    <h4>Top Categories</h4>
                    <BarChart width={730} height={250} data={topCategoriesArray}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Legend />
                        <Bar dataKey="count" fill="orange" />
                    </BarChart>
                </div>
            </div>

        </div>
    );
}