import React from "react";

import css from "./Checkbox.module.css";

export interface CheckboxProps {
    isChecked?: boolean;
    style?: React.CSSProperties;
    className?: string;
    onToggle?: () => void;
}

export const Checkbox = (props: CheckboxProps) => {
    return (
        <div
            style={props.style}
            className={css.container}
            onClick={() => {
                if (props.onToggle) props.onToggle();
            }}>

            <input
                readOnly={false}
                type="checkbox"
                checked={props.isChecked}
                onChange={() => {}}
            />

            <span className={css.checkmark}></span>
            
        </div>
    );
}

