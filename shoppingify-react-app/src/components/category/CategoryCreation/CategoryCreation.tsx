import React from "react";
import { Modal } from "react-bootstrap";

import { Category } from "../../../models/category";
import { IError } from "../../../models/common";
import { User } from "../../../models/user";
import { actionTypes as categoryAT } from "../../../store/category";
import categoryApiClient from "../../../services/api-clients/CategoryApiClient";
import { useStore } from "../../../store/useStore";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import css from "./CategoryCreation.module.css";
import { coClass } from "../../../common/functions";

export interface ICategoryCreationProps {
    onCreated?: () => void;
    onClosed?: () => void;
    onError?: () => void;
}

export const CategoryCreation = (props: ICategoryCreationProps) => {
    const [appState, dispatch] = useStore();
    const [categoryName, setCategoryName] = React.useState(null);
    const [isCreatingCategory, setIsCreatingCategory] = React.useState(false);
    const [categoryError, setCategoryError] = React.useState(null);

    const isUniqueCategoryName = (name: string): boolean => {
        return !appState.category.categories.some(c => c.name === name);
    }

    const closeCategoryModal = (): void => {
        if (props.onClosed) props.onClosed();
    }

    const changeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryError(null);
        setCategoryName(e.target.value);
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
                    if (props.onCreated) props.onCreated();
                    setIsCreatingCategory(false);
                })
                .catch((err: IError) => {
                    setIsCreatingCategory(false);
                    if (props.onError) props.onError();
                });
        }
    }

    return (
        <Modal show={true} onHide={closeCategoryModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input
                    className={coClass(css.input)}
                    id="name"
                    type="text"
                    styleType={categoryError ? "error" : "secondary"}
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
    );
}

