import React from "react";

import { useStore } from "../../../store/useStore";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Toggle } from "../../ui/Toggle/Toggle";
import css from "./List.module.css";
import bottle from "../../../assets/bottle.png";
import { actionTypes as commonAT } from "../../../store/common";
import { actionTypes as listAT } from "../../../store/list";
import { ListStatus, SideDrawerMode } from "../../../common/data";
import { coClass } from "../../../common/functions";
import { List as ListModel } from "../../../models/list";
import { ItemForAddition } from "../ItemForAddition/ItemForAddition";
import { ItemForChecking } from "../ItemForChecking/ItemForChecking";
import { User } from "../../../models/user";
import listApiClient from "../../../services/api-clients/ListApiClient";
import { IApiResponse } from "../../../models/common";

export const List = () => {
    const [appState, dispatch] = useStore("List", "all");
    const [listName, setListName] = React.useState<string>("");
    const [isSaving, setIsSaving] = React.useState(false);

    const sideDrawerMode = appState.common.sidedrawerMode;
    const activeList: ListModel = appState.list.activeList;
    const itemsGroupedByCategoryName = appState.list.categoryNameToActiveListItems;
    const categoryNames = Object.keys(itemsGroupedByCategoryName).sort();
    const isListHasItems = categoryNames.length;
    const isListSavedInDB = activeList && activeList.id;

    const switchToItemCreation = (): void => {
        dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ItemCreation });
    };

    const toggleListMode = (isOn: boolean): void => {
        if (isOn && isListHasItems) {
            dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ListCompletion });
        } else {
            dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ListCreation });
        }
    };

    const saveListWithStatus = (status: ListStatus): void => {
        setIsSaving(true);

        if (isListSavedInDB) {
            const updatedList = new ListModel({
                ...activeList,
                items: appState.list.activeListItems,
                status: status,
            });

            listApiClient.update(updatedList)
                .then((res: IApiResponse) => {
                    setIsSaving(false);
                    setListName("");
                    dispatch({ type: listAT.clearActiveList });
                    dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ListCreation });
                })
                .catch(err => {
                    setIsSaving(false);
                    console.log(err);
                });
        } else {
            const newList = new ListModel({
                name: "Shopping List",
                createdDate: new Date(),
                createdBy: new User({
                    id: appState.auth.currentUserId,
                    email: appState.auth.currentUserEmail
                }),
                status: status,
                items: appState.list.activeListItems,
            });

            listApiClient.create(newList)
                .then((res: IApiResponse) => {
                    setIsSaving(false);
                    setListName("");
                    dispatch({ type: listAT.clearActiveList });
                    dispatch({ type: commonAT.setSidedrawerMode, payload: SideDrawerMode.ListCreation });
                })
                .catch(err => {
                    setIsSaving(false);
                    console.log(err);
                });
        }
    };

    const completeActiveList = (): void => {
        saveListWithStatus(ListStatus.Completed);
    };

    const cancelActiveList = (): void => {
        saveListWithStatus(ListStatus.Canceled);
    };

    const saveActiveList = (): void => {
        setIsSaving(true);

        if (isListSavedInDB) {
            const updatedList = new ListModel({
                ...activeList,
                items: appState.list.activeListItems,
            });

            listApiClient.update(updatedList)
                .then((res: IApiResponse) => {
                    setIsSaving(false);
                    setListName("");
                })
                .catch(err => {
                    setIsSaving(false);
                    console.log(err);
                });
        } else {
            const newList = new ListModel({
                name: listName,
                createdDate: new Date(),
                createdBy: new User({
                    id: appState.auth.currentUserId,
                    email: appState.auth.currentUserEmail
                }),
                status: ListStatus.Active,
                items: appState.list.activeListItems,
            });

            listApiClient.create(newList)
                .then((res: IApiResponse) => {
                    setIsSaving(false);
                    setListName("");
                    newList.id = res.data.name;
                    dispatch({ type: listAT.createListSuccess, payload: newList });
                })
                .catch(err => {
                    setIsSaving(false);
                    console.log(err);
                });
        }
    };

    const renderItemsInCategory = (categoryName: string): React.ReactNode => {
        return itemsGroupedByCategoryName[categoryName].map(i =>
            sideDrawerMode === SideDrawerMode.ListCreation
                ? <ItemForAddition key={i.item.id} item={i} />
                : <ItemForChecking key={i.item.id} item={i} />
        );
    };

    return (
        <div className={css.list}>

            <div className={css.body}>
                <div className={css.header}>
                    <img className={css.bottle} src={bottle} alt="bottle" />
                    <div>
                        <h5>Didn't find what you need?</h5>
                        <button className={css.addItemButton} onClick={switchToItemCreation}>Add Item</button>
                    </div>
                </div>

                <div className={css.title}>
                    <h3>{activeList && isListSavedInDB ? activeList.name : "Shopping List"}</h3>
                    <Toggle isOn={sideDrawerMode === SideDrawerMode.ListCompletion} onToggle={toggleListMode} />
                </div>

                <div className={coClass(css.content, !isListHasItems ? css.background : null)}>
                    {
                        isListHasItems
                            ? categoryNames.map(cn =>
                                <div key={cn} className={css.itemInCategory}>
                                    <h5 className={css.categoryName}>{cn}</h5>
                                    {renderItemsInCategory(cn)}
                                </div>
                            )
                            : <strong className={css.noItems}>No items</strong>
                    }
                </div>
            </div>

            {
                sideDrawerMode === SideDrawerMode.ListCreation &&
                <div className={css.footer}>
                    {
                        activeList && isListSavedInDB
                            ? <Button disabled={isSaving} type="primary" onClick={saveActiveList}>Save</Button>
                            : <form className={css.saveForm}>
                                <Input
                                    value={listName}
                                    type="text"
                                    styleType={!listName || !isListHasItems ? "secondary" : "primary"}
                                    placeholder="Enter a name"
                                    onChange={(e) => setListName(e.target.value)}
                                />
                                <Button
                                    disabled={!listName || !isListHasItems || isSaving}
                                    type={!listName || !isListHasItems ? "secondary" : "primary"}
                                    onClick={saveActiveList}
                                >
                                    Save
                                </Button>
                            </form>
                    }
                </div>
            }

            {
                sideDrawerMode === SideDrawerMode.ListCompletion &&
                <div className={css.footer}>
                    <Button type="white" onClick={cancelActiveList} disabled={isSaving}>cancel</Button>
                    {" "}
                    <Button type="primary" onClick={completeActiveList} disabled={isSaving}>Complete</Button>
                </div>
            }

        </div>
    );
}

