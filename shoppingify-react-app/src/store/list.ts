import { List } from "../models/list";
import { ListItem } from "../models/listItem";
import { IAction, IAppState, initStore } from "./useStore";
import { actionTypes as itemAT } from "./item";
import { Item } from "../models/item";

export interface IListState {
    activeList: List;
    activeListItems: ListItem[];
    categoryNameToActiveListItems: { [categoryName: string]: ListItem[] };
    lists: List[];
}

const initialState: IListState = {
    activeList: null,
    activeListItems: [],
    categoryNameToActiveListItems: {},
    lists: [],
};

export const actionTypes = {
    addItemToList: "List/AddItemToList",
    deleteItemFromList: "List/DeleteItemFromList",
    increaseItemCount: "List/IncreaseItemCount",
    decreaseItemCount: "List/DecreseItemCount",
    checkItem: "List/checkItem",
    uncheckItem: "List/uncheckItem",
    createListSuccess: "List/CreateListSuccess",
    getActiveListSuccess: "List/GetActiveListSuccess",
    clearActiveList: "List/ClearActiveList",
    searchListsSuccess: "List/SearchListsSuccess",
    addListToLists: "List/AddListToLists",
};

const configureStore = () => {
    const reducer = {
        [actionTypes.addItemToList]: (state: IAppState, action: IAction<ListItem>): IAppState => {
            const itemsInActiveList = [...state.list.activeListItems, action.payload];
            const categoryNameToActiveListItems = indexCategoryNameToActiveListItems(itemsInActiveList);

            return {
                list: {
                    ...state.list,
                    activeListItems: itemsInActiveList,
                    categoryNameToActiveListItems: categoryNameToActiveListItems,
                }
            };
        },
        [actionTypes.deleteItemFromList]: (state: IAppState, action: IAction<ListItem>): IAppState => {
            const itemsInActiveList = state.list.activeListItems.filter(i => i.item.id !== action.payload.item.id);
            const categoryNameToActiveListItems = indexCategoryNameToActiveListItems(itemsInActiveList);

            return {
                list: {
                    ...state.list,
                    activeListItems: itemsInActiveList,
                    categoryNameToActiveListItems: categoryNameToActiveListItems,
                }
            };
        },
        [actionTypes.increaseItemCount]: (state: IAppState, action: IAction<string>): IAppState => {
            const itemsInActiveList = state.list.activeListItems.map((i: ListItem): ListItem =>
                i.item.id === action.payload ? { ...i, amount: i.amount + 1 } : i
            );
            const categoryNameToActiveListItems = indexCategoryNameToActiveListItems(itemsInActiveList);

            return {
                list: {
                    ...state.list,
                    activeListItems: itemsInActiveList,
                    categoryNameToActiveListItems: categoryNameToActiveListItems,
                }
            };
        },
        [actionTypes.decreaseItemCount]: (state: IAppState, action: IAction<string>): IAppState => {
            const itemsInActiveList = state.list.activeListItems.map((i: ListItem): ListItem =>
                i.item.id === action.payload ? { ...i, amount: i.amount - 1 } : i
            );
            const categoryNameToActiveListItems = indexCategoryNameToActiveListItems(itemsInActiveList);

            return {
                list: {
                    ...state.list,
                    activeListItems: itemsInActiveList,
                    categoryNameToActiveListItems: categoryNameToActiveListItems,
                }
            };
        },

        [actionTypes.checkItem]: (state: IAppState, action: IAction<string>): IAppState => {
            const itemsInActiveList = state.list.activeListItems.map((i: ListItem): ListItem =>
                i.item.id === action.payload ? { ...i, isChecked: true } : i
            );

            const categoryNameToActiveListItems = indexCategoryNameToActiveListItems(itemsInActiveList);

            return {
                list: {
                    ...state.list,
                    activeListItems: itemsInActiveList,
                    categoryNameToActiveListItems: categoryNameToActiveListItems,
                }
            };
        },
        [actionTypes.uncheckItem]: (state: IAppState, action: IAction<string>): IAppState => {
            const itemsInActiveList = state.list.activeListItems.map((i: ListItem): ListItem =>
                i.item.id === action.payload ? { ...i, isChecked: false } : i
            );

            const categoryNameToActiveListItems = indexCategoryNameToActiveListItems(itemsInActiveList);

            return {
                list: {
                    ...state.list,
                    activeListItems: itemsInActiveList,
                    categoryNameToActiveListItems: categoryNameToActiveListItems,
                }
            };
        },
        [itemAT.deleteItemSuccess]: (state: IAppState, action: IAction<Item>): IAppState => {
            const itemsInActiveList = state.list.activeListItems.filter(i => i.item.id !== action.payload.id);
            const categoryNameToActiveListItems = indexCategoryNameToActiveListItems(itemsInActiveList);

            return {
                list: {
                    ...state.list,
                    activeListItems: itemsInActiveList,
                    categoryNameToActiveListItems: categoryNameToActiveListItems,
                }
            };
        },
        [actionTypes.createListSuccess]: (state: IAppState, action: IAction<List>): IAppState => {
            return {
                list: {
                    ...state.list,
                    activeList: action.payload,
                }
            };
        },
        [actionTypes.getActiveListSuccess]: (state: IAppState, action: IAction<List>): IAppState => {
            const itemsInActiveList = action.payload.items;
            const categoryNameToActiveListItems = indexCategoryNameToActiveListItems(itemsInActiveList);

            return {
                list: {
                    ...state.list,
                    activeList: action.payload,
                    activeListItems: itemsInActiveList,
                    categoryNameToActiveListItems: categoryNameToActiveListItems,
                }
            };
        },
        [actionTypes.clearActiveList]: (state: IAppState): IAppState => {
            return {
                list: {
                    ...state.list,
                    activeList: null,
                    activeListItems: [],
                    categoryNameToActiveListItems: {},
                }
            };
        },
        [actionTypes.searchListsSuccess]: (state: IAppState, action: IAction<List[]>): IAppState => {
            const lists = action.payload;

            return {
                list: {
                    ...state.list,
                    lists: lists,
                }
            };
        },
        [actionTypes.addListToLists]: (state: IAppState, action: IAction<List>): IAppState => {
            let lists = [...state.list.lists, action.payload];

            return {
                list: {
                    ...state.list,
                    lists: lists,
                }
            };
        },
    };

    initStore(reducer, { list: initialState });
};

function indexCategoryNameToActiveListItems(items: ListItem[]) {
    const categoryToItems: { [categoryName: string]: ListItem[] } = {};

    for (let i = 0; i < items.length; i++) {
        const categoryName = items[i].item.category.name;

        if (categoryToItems[categoryName]) {
            categoryToItems[categoryName].push(items[i]);
        } else {
            categoryToItems[categoryName] = [items[i]];
        }
    }

    return categoryToItems;
}

export default configureStore;
