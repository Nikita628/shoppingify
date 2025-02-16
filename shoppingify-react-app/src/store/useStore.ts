import { useState, useEffect } from "react";

import { IAuthState } from "./auth";
import { ICategoryState } from "./category";
import { ICommonState } from "./common";
import { IItemState } from "./item";
import { IListState } from "./list";

export interface IAppState {
    auth?: IAuthState;
    common?: ICommonState;
    category?: ICategoryState;
    item?: IItemState;
    list?: IListState;
}

export interface IAction<PayloadType = any> {
    type: string;
    payload?: PayloadType;
}

let appReducer: { [key: string]: (state: IAppState, action: IAction) => IAppState }[] = [];

let listeners: { componentId: string, func: (state: IAppState) => void }[] = [];

let appState: IAppState = {
    auth: null,
    common: null,
};

export const useStore = (
    componentId: string,
    listenToSliceUpdate?: "auth" | "category" | "common" | "item" | "list" | "all"
): [IAppState, (action: IAction) => void] => {
    const setAppState = useState(appState)[1];

    const dispatch = (action: IAction) => {
        const updatedSlices: string[] = [];

        for (let i = 0; i < appReducer.length; i++) {
            if (appReducer[i][action.type]) {
                const newStateSlice: any = appReducer[i][action.type](appState, action);
                appState = { ...appState, ...newStateSlice };
                updatedSlices.push(Object.keys(newStateSlice)[0]);
            }
        }

        let needToNotifyCurrentListener = false;

        if (listenToSliceUpdate === "all"
            || (updatedSlices.some(u => u === listenToSliceUpdate))) {
            needToNotifyCurrentListener = true;
        }

        for (const l of listeners) {
            if (l.componentId === componentId) {
                if (needToNotifyCurrentListener) {
                    l.func(appState);
                }
            } else {
                l.func(appState);
            }
        }
    };

    useEffect(() => {
        if (listenToSliceUpdate) {
            listeners.push({ componentId: componentId, func: setAppState });
        }

        return () => {
            if (listenToSliceUpdate) {
                listeners = listeners.filter(l => l.componentId !== componentId);
            }
        };
    }, []);

    return [appState, dispatch];
};

export function initStore(
    reducer: { [actionType: string]: (state: IAppState, action: IAction) => IAppState },
    initialState: IAppState
): void {
    appState = { ...appState, ...initialState };
    appReducer.push(reducer);
};
