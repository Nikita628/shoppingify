import React from "react";
import css from "./Toggle.module.css";

export interface ToggleProps {
    isOn: boolean;
    onToggle: (isOn: boolean) => void;
}

export const Toggle = (props: ToggleProps) => {
    const [isOn, setIsOn] = React.useState<boolean>(props.isOn);

    return (
        <div
            className={css.toggle}
            style={{ backgroundColor: isOn ? "#f9a412" : "#efefef" }}
            onClick={() => {
                const newValue = !isOn;
                props.onToggle(newValue);
                setIsOn(newValue);
            }}>
            <span
                className={css.switch}
                style={{ marginRight: isOn ? "30px" : "0", marginLeft: isOn ? "0" : "30px" }}>
            </span>
        </div>
    );
}

