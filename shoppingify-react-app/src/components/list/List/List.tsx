import React from "react";
import { useStore } from "../../../store/useStore";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Toggle } from "../../ui/Toggle/Toggle";
import css from "./List.module.css";

export interface ListProps {

}

export const List = (props: ListProps) => {
    const [appState, dispatch] = useStore();

    return (
        <div className={css.list}>

            <div className={css.body}>
                <div className={css.header}>
                    header
                </div>

                <div className={css.title}>
                    <h3>Shopping List</h3>
                    <Toggle isOn={false} onToggle={() => { }} />
                </div>

                <div className={css.content}>
                </div>
            </div>

            <div className={css.footer}>
                <form className={css.saveForm}>
                    <Input type="text" styleType="secondary" placeholder="Enter a name" />
                    <Button type="secondary">Save</Button>
                </form>
            </div>
        </div>
    );
}

