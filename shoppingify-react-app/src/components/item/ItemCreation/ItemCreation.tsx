import React from "react";

import { useStore } from "../../../store/useStore";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import css from "./ItemCreation.module.css";
import { actionTypes as commonAT } from "../../../store/common";
import { SideDrawerMode } from "../../../common/data";
import { Select } from "../../ui/Select/Select";
import { CategoryCreation } from "../../category/CategoryCreation/CategoryCreation";

export const ItemCreation = () => {
    const [appState, dispatch] = useStore();
    const [isAddCategoryModalOpened, setIsAddCategoryModalOpened] = React.useState(false);

    const switchToList = (): void => {
        dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ListCreation });
    }

    return (
        <div className={css.itemCreation}>
            <h3>Add a new item</h3>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <Input className={css.input} id="name" type="text" styleType="secondary" highlightFocused placeholder="Enter a name" />
                </div>

                <div>
                    <label htmlFor="name">Note (optional)</label>
                    <textarea className={css.input} name="note" id="note" cols={30} rows={10} placeholder="Enter a note"></textarea>
                </div>

                <div>
                    <label htmlFor="name">Image (optional)</label>
                    <Input className={css.input} id="name" type="text" styleType="secondary" highlightFocused placeholder="Enter a url" />
                </div>

                <div>
                    <label htmlFor="name">Category</label>
                    <Select options={appState.category.categories} canCreate onAddNew={() => setIsAddCategoryModalOpened(true)} />
                </div>

                <div className={css.buttons}>
                    <Button type="white" onClick={switchToList}>cancel</Button>
                    {" "}
                    <Button type="primary">Save</Button>
                </div>
            </form>

            {
                isAddCategoryModalOpened &&
                <CategoryCreation
                    onCreated={() => setIsAddCategoryModalOpened(false)}
                    onClosed={() => setIsAddCategoryModalOpened(false)}
                />
            }
        </div>
    );
}

