import React from "react";
import { coClass } from "../../../common/functions";
import css from "./Button.module.css";

export interface ButtonProps {
    type: "primary" | "secondary";
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: ButtonProps) => {
    return (
        <button
            type="button"
            disabled={props.disabled}
            className={coClass(css[props.type], props.className, css.button)}
            style={props.style}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

