import React from "react";

import css from "./Select.module.css";
import { coClass } from "../../../common/functions";
import { IdName } from "../../../models/common";

export interface SelectProps {
    options: IdName[];
    value?: number | string;
    className?: string;
    style?: React.CSSProperties;
    canCreate?: boolean;
    name?: string;
    id?: string;
    onSelected?: (value: number | string) => void;
    onAddNew?: () => void;
}

export const Select = (props: SelectProps) => {
    const [selectedValue, setSelectedValue] = React.useState<string | number>(props.value ? props.value : "select");

    const options: JSX.Element[] = [(<option className={css.defaultOption} value="select" key="select">Select...</option>)];

    for (const o of props.options) {
        options.push(<option key={o.id} value={o.id}>{o.name}</option>);
    }

    if (props.canCreate) {
        options.push(<option value="add" key="add" onClick={props.onAddNew}>Add new +</option>);
    }

    const onChanged = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const idx = e.target.selectedIndex;

        if (e.target.options[idx].value === "add" && props.onAddNew) {
            props.onAddNew();
        } else {
            setSelectedValue(e.target.options[idx].value);

            if (props.onSelected) {
                props.onSelected(e.target.options[idx].value !== "selected" ? e.target.options[idx].value : null);
            }
        }
    }

    return (
        <select
            value={selectedValue}
            className={coClass(css.select, props.className)}
            style={props.style}
            name={props.name}
            id={props.id}
            onChange={onChanged}
        >
            {options}
        </select>
    );
}

