import { useState, useEffect } from "react";
import { IAuthState } from "./auth";

export interface IAppState {
    auth?: IAuthState;
}

export interface IAction<PayloadType = any> {
    type: string;
    payload: PayloadType;
}

let appState: IAppState = {};
let listeners: ((state: IAppState) => void)[] = [];
let appReducer: { [key: string]: (state: IAppState, action: IAction) => IAppState } = {};

export const useStore = (): [IAppState, (action: IAction) => void] => {
    const setAppState = useState(appState)[1];

    const dispatch = (action: IAction) => {
        const newState = appReducer[action.type](appState, action);
        appState = { ...appState, ...newState };

        for (const l of listeners) {
            l(appState);
        }
    };

    useEffect(() => {
        listeners.push(setAppState);

        return () => {
            listeners = listeners.filter(l => l !== setAppState);
        };
    }, [setAppState]);

    return [appState, dispatch];
};

export function initStore (
    reducer: { [actionType: string]: (state: IAppState, action: IAction) => IAppState },
    initialState: IAppState
): void {
    appState = { ...appState, ...initialState };
    appReducer = { ...appReducer, ...reducer };
};
