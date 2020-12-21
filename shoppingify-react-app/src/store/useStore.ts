import { useState, useEffect } from "react";

import { IAuthState } from "./auth";
import { ICommonState } from "./common";

export interface IAppState {
    auth?: IAuthState;
    common?: ICommonState;
}

export interface IAction<PayloadType = any> {
    type: string;
    payload?: PayloadType;
}

let appReducer: { [key: string]: (state: IAppState, action: IAction) => IAppState } = {};

let listeners: ((state: IAppState) => void)[] = [];

let appState: IAppState = {
    auth: null,
    common: null,
};

export const useStore = (shouldListenToStateUpdates = true): [IAppState, (action: IAction) => void] => {
    const setAppState = useState(appState)[1];

    const dispatch = (action: IAction) => {
        const newStateSlice = appReducer[action.type](appState, action);
        appState = { ...appState, ...newStateSlice };

        for (const l of listeners) {
            l(appState);
        }
    };

    useEffect(() => {
        if (shouldListenToStateUpdates) {
            listeners.push(setAppState);
        }

        return () => {
            if (shouldListenToStateUpdates) {
                listeners = listeners.filter(l => l !== setAppState);
            }
        };
    }, [setAppState, shouldListenToStateUpdates]);

    return [appState, dispatch];
};

export function initStore(
    reducer: { [actionType: string]: (state: IAppState, action: IAction) => IAppState },
    initialState: IAppState
): void {
    appState = { ...appState, ...initialState };
    appReducer = { ...appReducer, ...reducer };
};
