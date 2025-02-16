import React from "react";
import { coClass } from "../../../common/functions";
import css from "./Input.module.css";

export interface InputProps {
    type: string;
    styleType: "primary" | "secondary" | "error";
    value?: string;
    style?: React.CSSProperties;
    className?: string;
    placeholder?: string;
    highlightFocused?: boolean;
    id?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (props.highlightFocused) {
            inputRef.current.addEventListener("focus", () => setIsFocused(true));
            inputRef.current.addEventListener("blur", () => setIsFocused(false));
        }
    }, []);

    return (
        <input
            value={props.value}
            id={props.id}
            ref={inputRef}
            style={props.style}
            className={coClass(css.input, props.className, css[props.styleType], isFocused ? css.focused : null )}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    );
}

