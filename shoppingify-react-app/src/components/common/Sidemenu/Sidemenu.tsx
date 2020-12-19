import React from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import ExitToApp from '@material-ui/icons/ExitToApp';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import History from '@material-ui/icons/History';
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

import css from "./Sidemenu.module.css";
import authService from "../../../services/utils/AuthService";
import { useStore, appActionTypes } from "../../../store/useStore";

export const Sidemenu = () => {
    const [appState, dispatch] = useStore();

    const toggleSidedrawer = () => {
        if (appState.isSideDrawerOpened) {
            dispatch({ type: appActionTypes.closeSideDrawer });
        } else {
            dispatch({ type: appActionTypes.openSidedrawer });
        }
    }

    return (
        <div className={css.sidemenu}>
            <div className={css.top}>
                <ExitToApp className={css.menuIcon} onClick={() => authService.logout()} />
            </div>

            <div className={css.middle}>
                <NavLink to="/items" exact activeClassName={css.activeMenuItem}>
                    <FormatListBulleted className={css.menuIcon} />
                </NavLink>

                <NavLink to="/history" exact activeClassName={css.activeMenuItem}>
                    <History className={css.menuIcon} />
                </NavLink>

                <NavLink to="statistics" exact activeClassName={css.activeMenuItem}>
                    <InsertChartOutlined className={css.menuIcon} />
                </NavLink>
            </div>

            <div className={css.bottom}>
                <div
                    className={appState.isSideDrawerOpened ? css.activeCartIconContainer : css.cartIconContainer}
                    onClick={toggleSidedrawer}>
                    <ShoppingCart className={css.menuIcon} />
                </div>
            </div>
        </div>
    );
}

