import { Category } from "../models/category";
import { IAction, IAppState, initStore } from "./useStore";

export interface ICategoryState {
    categories: Category[];
}

const initialState: ICategoryState = {
    categories: [],
};

export const actionTypes = {
    searchCategoriesSuccess: "Category/SearchCategoriesSuccess",
    createCategorySuccess: "Category/CreateCategorySuccess",
};

const configureStore = () => {
    const reducer = {
        [actionTypes.searchCategoriesSuccess]: (state: IAppState, action: IAction<Category[]>): IAppState => {
            return { category: { ...state.category, categories: action.payload } }
        },
        [actionTypes.createCategorySuccess]: (state: IAppState, action: IAction<Category>): IAppState => {
            return { category: { ...state.category, categories: [...state.category.categories, action.payload] } }
        },
    };

    initStore(reducer, { category: initialState });
};

export default configureStore;
