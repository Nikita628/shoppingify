import { Category, CategorySearchParam } from "../../models/category";
import { IApiResponse } from "../../models/common";
import { IAction } from "../../store/useStore";
import categoryApiClient from "../api-clients/CategoryApiClient";
import itemApiClient from "../api-clients/ItemApiClient";
import { actionTypes as categoryAT } from "../../store/category";
import { actionTypes as itemAT } from "../../store/item";
import { Item, ItemSearchParam } from "../../models/item";

class CommonService {
    public async loadInitialData(dispatch: (action: IAction) => void, userId: string) {
        const categoryRes: IApiResponse = await categoryApiClient.search(new CategorySearchParam({ createdById: userId }));
        const itemRes: IApiResponse = await itemApiClient.search(new ItemSearchParam({ createdByUserId: userId }));

        const categories = Object.keys(categoryRes.data).map(k => Category.toModel({ ...categoryRes.data[k], id: k }));
        const items = Object.keys(itemRes.data).map(k => Item.toModel({ ...itemRes.data[k], id: k }));

        dispatch({ type: categoryAT.searchCategoriesSuccess, payload: categories });
        dispatch({ type: itemAT.searchItemsSuccess, payload: items });
    }
}

export default new CommonService();
