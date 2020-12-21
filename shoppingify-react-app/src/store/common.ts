import { SideDrawerMode } from "../common/data";
import { IAppState, initStore } from "./useStore";

export interface ICommonState {
    sidedrawerMode: SideDrawerMode;
    isSideDrawerOpened: boolean;
}

const initialState: ICommonState = {
    sidedrawerMode: null,
    isSideDrawerOpened: false,
};

export const actionTypes = {
    openSidedrawer: "App/OpenSidedrawer",
    closeSideDrawer: "App/CloseSidedrawer",
};

const configureStore = () => {
    const reducer = {
        [actionTypes.openSidedrawer]: (state: IAppState) => ({ common: { ...state.common, isSideDrawerOpened: true } }),
        [actionTypes.closeSideDrawer]: (state: IAppState) => ({ common: { ...state.common, isSideDrawerOpened: false } }),
    };

    initStore(reducer, { common: initialState });
};

export default configureStore;
