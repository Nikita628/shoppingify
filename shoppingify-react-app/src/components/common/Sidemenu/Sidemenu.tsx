import React from "react";
import { NavLink } from "react-router-dom";
import ExitToApp from '@material-ui/icons/ExitToApp';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import History from '@material-ui/icons/History';
import InsertChartOutlined from '@material-ui/icons/InsertChartOutlined';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

import css from "./Sidemenu.module.css";
import authService from "../../../services/utils/AuthService";
import { useStore, appActionTypes } from "../../../store/useStore";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";

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
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 100, hide: 200 }}
                    overlay={(p) => (<Tooltip id="button-tooltip" {...p}>Logout</Tooltip>)}
                >
                    <ExitToApp className={css.menuIcon} onClick={() => authService.logout()} />
                </OverlayTrigger>
            </div>

            <div className={css.middle}>
                <NavLink to="/items" exact activeClassName={css.activeMenuItem}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 100, hide: 200 }}
                        overlay={(p) => (<Tooltip id="button-tooltip" {...p}>Items</Tooltip>)}
                    >
                        <FormatListBulleted className={css.menuIcon} />
                    </OverlayTrigger>
                </NavLink>

                <NavLink to="/history" exact activeClassName={css.activeMenuItem}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 100, hide: 200 }}
                        overlay={(p) => (<Tooltip id="button-tooltip" {...p}>History</Tooltip>)}
                    >
                        <History className={css.menuIcon} />
                    </OverlayTrigger>
                </NavLink>

                <NavLink to="statistics" exact activeClassName={css.activeMenuItem}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 100, hide: 200 }}
                        overlay={(p) => (<Tooltip id="button-tooltip" {...p}>Statistics</Tooltip>)}
                    >
                        <InsertChartOutlined className={css.menuIcon} />
                    </OverlayTrigger>
                </NavLink>
            </div>

            <div className={css.bottom}>
                <div
                    className={appState.isSideDrawerOpened ? css.activeCartIconContainer : css.cartIconContainer}
                    onClick={toggleSidedrawer}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 100, hide: 200 }}
                        overlay={(p) => (<Tooltip id="button-tooltip" {...p}>Shopping List</Tooltip>)}
                    >
                        <ShoppingCart className={css.menuIcon} />
                    </OverlayTrigger>
                </div>
            </div>
        </div>
    );
}

