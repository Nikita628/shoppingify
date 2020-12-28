import React from "react";
import Back from '@material-ui/icons/KeyboardBackspace';

import { useStore } from "../../../store/useStore";
import css from "./ItemDetails.module.css";
import { Button } from "../../ui/Button/Button";
import { actionTypes as commonAT } from "../../../store/common";
import { actionTypes as itemAT } from "../../../store/item";
import { actionTypes as listAT } from "../../../store/list";
import { SideDrawerMode } from "../../../common/data";
import { Modal } from "react-bootstrap";
import itemApiClient from "../../../services/api-clients/ItemApiClient";
import { ListItem } from "../../../models/listItem";

export const ItemDetails = () => {
    const [appState, dispatch] = useStore("item");
    const [isDeleteItemModalOpened, setIsDeleteItemModalOpened] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const itemsInActiveList = appState.list.activeListItems;
    const currentItem = appState.item.item;

    if (!currentItem) return null;

    const switchToList = (): void => {
        dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ListCreation });
    };

    const deleteItem = (): void => {
        setIsDeleting(true);
        itemApiClient.delete(currentItem.id)
            .then(res => {
                dispatch({ type: itemAT.deleteItemSuccess, payload: currentItem });
                switchToList();
            })
            .catch(err => {
                setIsDeleting(false);
                console.log(err);
            });
    };

    const addToList = (): void => {
        if (itemsInActiveList.some(i => i.item.id === currentItem.id)) {
            dispatch({ type: listAT.increaseItemCount, payload: currentItem.id });
        } else {
            const newListItem: ListItem = new ListItem({
                item: currentItem,
                amount: 1,
                isChecked: false,
            });

            dispatch({ type: listAT.addItemToList, payload: newListItem });
        }

        dispatch({ type: itemAT.setItem, payload: null });
        switchToList();
    };

    return (
        <div className={css.itemDetails}>
            <div className={css.content}>
                <div className={css.backContainer}>
                    <button onClick={switchToList} className={css.back}><Back /> back</button>
                </div>

                {currentItem.imgUrl && <img className={css.image} src={currentItem.imgUrl} alt="item" />}

                <div className={css.section}>
                    <div className={css.label}>name</div>
                    <h3>{currentItem.name}</h3>
                </div>

                <div className={css.section}>
                    <div className={css.label}>category</div>
                    <h4>{currentItem.category.name}</h4>
                </div>

                {
                    currentItem.note &&
                    <div className={css.section}>
                        <div className={css.label}>note</div>
                        <p className={css.note}>{currentItem.note}</p>
                    </div>
                }
            </div>

            <div className={css.buttons}>
                <Button type="white" onClick={() => setIsDeleteItemModalOpened(true)}>delete</Button>
                {" "}
                <Button type="primary" onClick={addToList}>Add to list</Button>
            </div>

            <Modal show={isDeleteItemModalOpened} onHide={() => setIsDeleteItemModalOpened(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Are you sure that you want to delete the item?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="white" onClick={() => setIsDeleteItemModalOpened(false)}>
                        cancel
                    </Button>
                    <Button disabled={isDeleting} type="primary" onClick={deleteItem}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

