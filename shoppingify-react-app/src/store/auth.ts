import { SigninResponse } from "../models/auth";
import { IAction, IAppState, initStore } from "./useStore";

export interface IAuthState {
    token: string;
    currentUserId: string;
}

const initialState: IAuthState = {
    token: null,
    currentUserId: null,
};

export const actionTypes = {
    signinSuccess: "Auth/SigninSuccess",
};

const configureStore = () => {
    const reducer = {
        [actionTypes.signinSuccess]: (state: IAppState, action: IAction<SigninResponse>): IAppState => {
            return {
                auth: {
                    ...state.auth,
                    token: action.payload.idToken,
                    currentUserId: action.payload.localId,
                }
            };
        }
    };

    initStore(reducer, { auth: initialState });
};

export default configureStore;
