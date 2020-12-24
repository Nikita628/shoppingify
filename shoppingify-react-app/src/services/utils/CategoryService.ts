import { Category, CategorySearchParam } from "../../models/category";
import { IApiResponse } from "../../models/common";
import { IAction } from "../../store/useStore";
import categoryApiClient from "../api-clients/CategoryApiClient";
import { actionTypes as categoryAT } from "../../store/category";

class CategoryService {
    public async getAllCategories(dispatch: (action: IAction) => void, userId: string) {
        const res: IApiResponse = await  categoryApiClient.search(new CategorySearchParam({ createdById: userId }));

        const categories = Object.keys(res.data).map(k => Category.toModel({ ...res.data[k], id: k }));

        dispatch({ type: categoryAT.searchCategoriesSuccess, payload: categories });
    }
}

export default new CategoryService();
