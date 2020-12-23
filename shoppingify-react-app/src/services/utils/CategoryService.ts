import { Category, CategorySearchParam } from "../../models/category";
import { IApiResponse, IError } from "../../models/common";
import { IAction } from "../../store/useStore";
import categoryApiClient from "../api-clients/CategoryApiClient";
import { actionTypes as categoryAT } from "../../store/category";

class CategoryService {
    public getAllCategories(dispatch: (action: IAction) => void, userId: string): void {
        categoryApiClient.search(new CategorySearchParam({ createdById: userId }))
            .then((res: IApiResponse) => {
                const categories = Object.keys(res.data).map(k => Category.toModel({ ...res.data[k], id: k }));
                dispatch({ type: categoryAT.searchCategoriesSuccess, payload: categories });
            })
            .catch((err: IError) => {
                // TODO error modal
                console.log(err);
            });
    }
}

export default new CategoryService();
