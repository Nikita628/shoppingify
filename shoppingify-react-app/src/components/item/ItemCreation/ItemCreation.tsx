import React from "react";

import { useStore } from "../../../store/useStore";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import css from "./ItemCreation.module.css";
import { actionTypes as commonAT } from "../../../store/common";
import { actionTypes as itemAT } from "../../../store/item";
import { SideDrawerMode } from "../../../common/data";
import { Select } from "../../ui/Select/Select";
import { CategoryCreation } from "../../category/CategoryCreation/CategoryCreation";
import { Item } from "../../../models/item";
import { User } from "../../../models/user";
import itemApiClient from "../../../services/api-clients/ItemApiClient";
import { IApiResponse } from "../../../models/common";

export const ItemCreation = () => {
    const [appState, dispatch] = useStore("all");
    const [isAddCategoryModalOpened, setIsAddCategoryModalOpened] = React.useState(false);
    const [name, setName] = React.useState<string>(null);
    const [categoryId, setCategoryId] = React.useState<string>(null);
    const [imgUrl, setImgUrl] = React.useState<string>(null);
    const [note, setNote] = React.useState<string>(null);
    const [nameError, setNameError] = React.useState<string>(null);
    const [categoryError, setCategoryError] = React.useState<string>(null);
    const [isCreating, setIsCreating] = React.useState(false);

    const switchToList = (): void => {
        dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ListCreation });
    }

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameError(null);
        setName(e.target.value)
    }

    const changeCategory = (value: string | number) => {
        setCategoryError(null);
        setCategoryId(value as string)
    }

    const createItem = (): void => {
        let isError = false;

        if (!name) {
            setNameError("Name is required");
            isError = true;
        }

        if (!categoryId) {
            setCategoryError("Category is required");
            isError = true;
        }

        if (isError) return;

        setIsCreating(true);

        const newItem = new Item({
            name: name,
            createdDate: new Date(),
            createdBy: new User({
                id: appState.auth.currentUserId,
                email: appState.auth.currentUserEmail
            }),
            note: note,
            imgUrl: imgUrl,
            category: appState.category.categories.find(c => c.id === categoryId),
        });

        itemApiClient.create(newItem)
            .then((res: IApiResponse) => {
                newItem.id = res.data.name;
                dispatch({ type: itemAT.createItemSuccess, payload: newItem });
                dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ItemDetails });
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className={css.itemCreation}>
            <h3>Add a new item</h3>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <Input
                        className={css.input}
                        id="name"
                        type="text"
                        styleType={nameError ? "error" : "secondary"}
                        highlightFocused
                        placeholder="Enter a name"
                        onChange={changeName}
                    />
                    {nameError && <div className={css.error}>{nameError}</div>}
                </div>

                <div>
                    <label htmlFor="name">Note (optional)</label>
                    <textarea
                        className={css.input}
                        name="note"
                        id="note"
                        cols={30}
                        rows={10}
                        placeholder="Enter a note"
                        onChange={e => setNote(e.target.value)}
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="name">Image (optional)</label>
                    <Input
                        className={css.input}
                        id="name"
                        type="text"
                        styleType="secondary"
                        highlightFocused
                        placeholder="Enter a url"
                        onChange={e => setImgUrl(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="name">Category</label>
                    <Select
                        isInvalid={!!categoryError}
                        options={appState.category.categories}
                        canCreate
                        onAddNew={() => setIsAddCategoryModalOpened(true)}
                        onSelected={changeCategory}
                    />
                    {categoryError && <div className={css.error}>{categoryError}</div>}
                </div>

                <div className={css.buttons}>
                    <Button type="white" onClick={switchToList}>cancel</Button>
                    {" "}
                    <Button disabled={!!categoryError || !!nameError || isCreating} type="primary" onClick={createItem}>Save</Button>
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

