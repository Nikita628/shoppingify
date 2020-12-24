import React from "react";
import Back from '@material-ui/icons/KeyboardBackspace';

import { useStore } from "../../../store/useStore";
import css from "./ItemDetails.module.css";
import { Button } from "../../ui/Button/Button";
import { actionTypes as commonAT } from "../../../store/common";
import { SideDrawerMode } from "../../../common/data";
import { Modal } from "react-bootstrap";
import itemApiClient from "../../../services/api-clients/ItemApiClient";

export const ItemDetails = () => {
    const [appState, dispatch] = useStore("item");
    const [isDeleteItemModalOpened, setIsDeleteItemModalOpened] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const itemState = appState.item;

    if (!itemState.item) return null;

    const switchToList = (): void => {
        dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ListCreation });
    }

    const deleteItem = (): void => {
        setIsDeleting(true);
        itemApiClient.delete(itemState.item.id)
            .then(res => {
                console.log(res);
                // TODO set item to null in state
                // delete item from state (single and from categories)
                switchToList();
            })
            .catch(err => {
                setIsDeleting(false);
                console.log(err);
            });
    }

    return (
        <div className={css.itemDetails}>
            <div className={css.content}>
                <div className={css.backContainer}>
                    <button onClick={switchToList} className={css.back}><Back /> back</button>
                </div>

                {itemState.item.imgUrl && <img className={css.image} src={itemState.item.imgUrl} alt="item" />}

                <div className={css.section}>
                    <div className={css.label}>name</div>
                    <h3>{itemState.item.name}</h3>
                </div>

                <div className={css.section}>
                    <div className={css.label}>category</div>
                    <h4>{itemState.item.category.name}</h4>
                </div>

                {
                    itemState.item.note &&
                    <div className={css.section}>
                        <div className={css.label}>note</div>
                        <p className={css.note}>{itemState.item.note}</p>
                    </div>
                }
            </div>

            <div className={css.buttons}>
                <Button type="white" onClick={() => setIsDeleteItemModalOpened(true)}>delete</Button>
                {" "}
                <Button type="primary" onClick={() => { }}>Add to list</Button>
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

