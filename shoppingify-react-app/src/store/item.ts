import { Item } from "../models/item";
import { IAction, IAppState, initStore } from "./useStore";

export interface IItemState {
    item: Item;
    items: Item[];
    categoryNameToItems: { [categoryName: string]: Item[] };
}

const initialState: IItemState = {
    item: null,
    items: [],
    categoryNameToItems: {},
};

export const actionTypes = {
    searchItemsSuccess: "Item/SearchItemsSuccess",
    createItemSuccess: "Item/CreateItemSuccess",
    deleteItemSuccess: "Item/DeleteItemSuccess",
    setItem: "Item/SetItem",
};

const configureStore = () => {
    const reducer = {
        [actionTypes.searchItemsSuccess]: (state: IAppState, action: IAction<Item[]>): IAppState => {
            const categoryNameToItems = indexCategoryNameToItems(action.payload);

            return {
                item: {
                    ...state.item,
                    items: action.payload,
                    categoryNameToItems: categoryNameToItems,
                }
            };
        },
        [actionTypes.createItemSuccess]: (state: IAppState, action: IAction<Item>): IAppState => {
            const items = [...state.item.items, action.payload];
            const categoryToItems = indexCategoryNameToItems(items);

            return {
                item: {
                    ...state.item,
                    item: action.payload,
                    items: items,
                    categoryNameToItems: categoryToItems,
                }
            };
        },
        [actionTypes.deleteItemSuccess]: (state: IAppState, action: IAction<Item>): IAppState => {
            const items = state.item.items.filter(i => i.id !== action.payload.id);
            const categoryNameToItems = indexCategoryNameToItems(items);

            return {
                item: {
                    ...state.item,
                    item: null,
                    items: items,
                    categoryNameToItems: categoryNameToItems,
                }
            };
        },
        [actionTypes.setItem]: (state: IAppState, action: IAction<Item>): IAppState => {
            return {
                item: {
                    ...state.item,
                    item: action.payload,
                }
            };
        },
    };

    initStore(reducer, { item: initialState });
};

function indexCategoryNameToItems(items: Item[]) {
    const categoryToItems: { [categoryName: string]: Item[] } = {};

    for (let i = 0; i < items.length; i++) {
        const categoryName = items[i].category.name;

        if (categoryToItems[categoryName]) {
            categoryToItems[categoryName].push(items[i]);
        } else {
            categoryToItems[categoryName] = [items[i]];
        }
    }

    return categoryToItems;
}

export default configureStore;
