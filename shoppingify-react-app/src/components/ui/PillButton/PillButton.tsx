import React from "react";

import { coClass } from "../../../common/functions";
import css from "./PillButton.module.css";

export interface PillButtonProps {
    text: string;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
}

export const PillButton = (props: PillButtonProps) => {
    return (
        <div
            style={props.style}
            className={coClass(css.pillButton, props.className)}
            onClick={props.onClick}
        >
            {props.text}
        </div>
    );
}

