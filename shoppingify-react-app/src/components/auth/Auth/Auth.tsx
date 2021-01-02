import React from "react";
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Email from '@material-ui/icons/AlternateEmail';
import Lock from '@material-ui/icons/Lock';
import Spinner from 'react-bootstrap/Spinner';

import css from "./Auth.module.css";
import authApiClient from "../../../services/api-clients/AuthApiClient";
import authService from "../../../services/utils/AuthService";
import { useStore } from "../../../store/useStore";
import { actionTypes } from "../../../store/auth";

export const Auth = () => {
    const dispatch = useStore("Auth")[1];
    const [isSigninMode, setIsSigninMode] = React.useState<boolean>(true);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");

    const authenticate = () => {
        setIsLoading(true);
        if (isSigninMode) {
            authApiClient.signin(email, password)
                .then((res) => {
                    authService.setAuthIntoLocalStorage(res.data);
                    dispatch({ type: actionTypes.signinSuccess, payload: res.data });
                }).catch((err) => {
                    setIsLoading(false);
                    setError(err.response.data.error.message);
                });
        } else {
            authApiClient.signup(email, password)
                .then((res) => {
                    setIsLoading(false);
                    setIsSigninMode(true);
                    setEmail("");
                    setPassword("");
                    setError("");
                }).catch((err) => {
                    setIsLoading(false);
                    setError(err);
                });
        }
    };

    const useDemoAccount = (): void => {
        authApiClient.signin("name@name.com", "password")
            .then((res) => {
                authService.setAuthIntoLocalStorage(res.data);
                dispatch({ type: actionTypes.signinSuccess, payload: res.data });
            }).catch((err) => {
                setIsLoading(false);
                setError(err.response.data.error.message);
            });
    };

    return (
        <div className={css.auth}>
            <h3 className={css.formHeader}>
                <ShoppingCart style={{ marginRight: "10px", marginLeft: "-10px" }} />
                Shoppingify
            </h3>

            <form className={css.authForm}>

                <div className={css.switchButtonContainer}>
                    <button
                        className={css.switchButton}
                        type="button"
                        onClick={() => {
                            setIsSigninMode(!isSigninMode);
                            setError("");
                        }}>
                        {`switch to ${isSigninMode ? "signup" : "signin"}`}
                    </button>
                </div>

                <div className={css.inputContainer}>
                    <Email className={css.inputIcon} fontSize="large" />
                    <input
                        className={css.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className={css.inputContainer}>
                    <Lock className={css.inputIcon} fontSize="large" />
                    <input
                        className={css.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button disabled={isLoading || !email || !password} className={css.submitButton} type="button" onClick={authenticate}>
                    {isSigninMode ? "SIGNIN" : "SIGNUP"}
                    {isLoading && <Spinner style={{ margin: "0 0 0 5px" }} size="sm" animation="border" />}
                </button>

            </form>

            <button className={css.demoAcc} onClick={useDemoAccount}>
                click here to use demo account
            </button>

            {error && <p className={css.error}>{error}</p>}
        </div>
    );
}

