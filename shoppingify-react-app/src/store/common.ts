import { SideDrawerMode } from "../common/data";
import { IAction, IAppState, initStore } from "./useStore";

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
    setSidedrawerMode: "Common/SetSidedrawerMode",
};

const configureStore = () => {
    const reducer = {
        [actionTypes.openSidedrawer]: (state: IAppState) => ({ common: { ...state.common, isSideDrawerOpened: true } }),
        [actionTypes.closeSideDrawer]: (state: IAppState) => ({ common: { ...state.common, isSideDrawerOpened: false } }),
        [actionTypes.setSidedrawerMode]: (state: IAppState, action: IAction<SideDrawerMode>) => ({ common: { ...state.common, sidedrawerMode: action.payload } }),
    };

    initStore(reducer, { common: initialState });
};

export default configureStore;
