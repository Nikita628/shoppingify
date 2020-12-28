import { SigninResponse } from "../models/auth";
import { IAction, IAppState, initStore } from "./useStore";

export interface IAuthState {
    token: string;
    currentUserId: string;
    currentUserEmail: string;
    failedLoginFromLocalStorage: boolean;
}

const initialState: IAuthState = {
    token: null,
    currentUserId: null,
    currentUserEmail: null,
    failedLoginFromLocalStorage: false,
};

export const actionTypes = {
    signinSuccess: "Auth/SigninSuccess",
    loginFromLocalStorageFailed: "Auth/LoginFromLocalStorageFailed",
};

const configureStore = () => {
    const reducer = {
        [actionTypes.signinSuccess]: (state: IAppState, action: IAction<SigninResponse>): IAppState => {
            return {
                auth: {
                    ...state.auth,
                    token: action.payload.idToken,
                    currentUserId: action.payload.localId,
                    currentUserEmail: action.payload.email,
                }
            };
        },
        [actionTypes.loginFromLocalStorageFailed]: (state: IAppState): IAppState => {
            return {
                auth: {
                    ...state.auth,
                    failedLoginFromLocalStorage: true,
                }
            };
        },
    };

    initStore(reducer, { auth: initialState });
};

export default configureStore;
