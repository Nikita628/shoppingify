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
};

const configureStore = () => {
    const reducer = {
        // [actionTypes.searchCategoriesSuccess]: (state: IAppState, action: IAction<Category[]>): IAppState => {
        //     return { category: { ...state.category, categories: action.payload } }
        // },
        [actionTypes.createItemSuccess]: (state: IAppState, action: IAction<Item>): IAppState => {
            return { item: { ...state.item, item: action.payload } }
        },
    };

    initStore(reducer, { item: initialState });
};

export default configureStore;
