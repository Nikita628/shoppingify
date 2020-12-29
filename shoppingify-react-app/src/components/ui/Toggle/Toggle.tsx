import React from "react";
import css from "./Toggle.module.css";

export interface ToggleProps {
    isOn: boolean;
    onToggle: (isOn: boolean) => void;
}

export const Toggle = (props: ToggleProps) => {
    return (
        <div
            className={css.toggle}
            style={{ backgroundColor: props.isOn ? "#f9a412" : "#efefef" }}
            onClick={() => {
                const newValue = !props.isOn;
                props.onToggle(newValue);
            }}>
            <span
                className={css.switch}
                style={{ marginRight: props.isOn ? "30px" : "0", marginLeft: props.isOn ? "0" : "30px" }}>
            </span>
        </div>
    );
}

