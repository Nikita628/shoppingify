import React from "react";

import { useStore } from "../../../store/useStore";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import css from "./ItemCreation.module.css";
import { actionTypes as commonAT } from "../../../store/common";
import { actionTypes as categoryAT } from "../../../store/category";
import { SideDrawerMode } from "../../../common/data";
import { Select } from "../../ui/Select/Select";
import { Modal } from "react-bootstrap";
import categoryApiClient from "../../../services/api-clients/CategoryApiClient";
import { Category } from "../../../models/category";
import { User } from "../../../models/user";
import { IError } from "../../../models/common";

export const ItemCreation = () => {
    const [appState, dispatch] = useStore();
    const [isAddCategoryModalOpened, setIsAddCategoryModalOpened] = React.useState(false);
    const [categoryName, setCategoryName] = React.useState(null);
    const [isCreatingCategory, setIsCreatingCategory] = React.useState(false);
    const [categoryError, setCategoryError] = React.useState(null);

    const switchToList = (): void => {
        dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ListCreation });
    }

    const isUniqueCategoryName = (name: string): boolean => {
        return !appState.category.categories.some(c => c.name === name);
    }

    const createCategory = (): void => {
        setCategoryError(null);

        if (!categoryName) return;

        if (!isUniqueCategoryName(categoryName)) {
            setCategoryError("Category with this name already exists");
        } else {
            setIsCreatingCategory(true);

            const newCategory = new Category({
                name: categoryName,
                createdDate: new Date(),
                createdBy: new User({
                    id: appState.auth.currentUserId,
                    email: appState.auth.currentUserEmail
                }),
            });

            categoryApiClient.create(newCategory)
                .then(() => {
                    dispatch({
                        type: categoryAT.createCategorySuccess,
                        payload: newCategory,
                    });
                    setIsAddCategoryModalOpened(false);
                    setIsCreatingCategory(false);
                })
                .catch((err: IError) => {
                    setIsCreatingCategory(false);
                    // TODO error modal
                });
        }
    }

    const closeCategoryModal = (): void => {
        setCategoryError(null);
        setIsAddCategoryModalOpened(false);
    }

    const changeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryError(null);
        setCategoryName(e.target.value);
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

            <Modal show={isAddCategoryModalOpened} onHide={closeCategoryModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        className={css.input}
                        id="name"
                        type="text"
                        styleType="secondary"
                        highlightFocused
                        placeholder="Enter a name"
                        onChange={changeCategoryName}
                    />
                    {categoryError && <span className={css.error}>{categoryError}</span>}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="white" onClick={closeCategoryModal}>
                        cancel
                    </Button>
                    <Button disabled={!categoryName || isCreatingCategory} type="primary" onClick={createCategory}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

