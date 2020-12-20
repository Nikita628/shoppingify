import { useState, useEffect } from "react";
import { SideDrawerMode } from "../common/data";
import { IAuthState } from "./auth";

export interface IAppState {
    auth?: IAuthState;
    sidedrawerMode?: SideDrawerMode;
    isSideDrawerOpened?: boolean;
}

export interface IAction<PayloadType = any> {
    type: string;
    payload?: PayloadType;
}

export const appActionTypes = {
    openSidedrawer: "App/OpenSidedrawer",
    closeSideDrawer: "App/CloseSidedrawer",
};

let appReducer: { [key: string]: (state: IAppState, action: IAction) => IAppState } = {
    [appActionTypes.openSidedrawer]: (state, action) => ({ ...state, isSideDrawerOpened: true }),
    [appActionTypes.closeSideDrawer]: (state, action) => ({ ...state, isSideDrawerOpened: false }),
};

let listeners: ((state: IAppState) => void)[] = [];
let appState: IAppState = {
    auth: null,
    sidedrawerMode: SideDrawerMode.ListCreation,
    isSideDrawerOpened: false,
};

export const useStore = (shouldListenToStateUpdates = true): [IAppState, (action: IAction) => void] => {
    const setAppState = useState(appState)[1];

    const dispatch = (action: IAction) => {
        const newState = appReducer[action.type](appState, action);
        appState = { ...appState, ...newState };

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
