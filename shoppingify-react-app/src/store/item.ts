import { Item } from "../models/item";
import { IAction, IAppState, initStore } from "./useStore";

export interface IItemState {
    item: Item;
}

const initialState: IItemState = {
    item: null,
};

export const actionTypes = {
    searchItemsSuccess: "Item/SearchItemsSuccess",
    createItemSuccess: "Item/CreateItemSuccess",
    deleteItemSuccess: "Item/DeleteItemSuccess",
};

const configureStore = () => {
    const reducer = {
        // [actionTypes.searchCategoriesSuccess]: (state: IAppState, action: IAction<Category[]>): IAppState => {
        //     return { category: { ...state.category, categories: action.payload } }
        // },
        [actionTypes.createItemSuccess]: (state: IAppState, action: IAction<Item>): IAppState => {
            return { item: { ...state.item, item: action.payload } }
        },
        [actionTypes.deleteItemSuccess]: (state: IAppState): IAppState => {
            return { item: { ...state.item, item: null } }
        },
    };

    initStore(reducer, { item: initialState });
};

export default configureStore;
