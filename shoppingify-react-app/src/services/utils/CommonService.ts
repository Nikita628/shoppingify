import { Category, CategorySearchParam } from "../../models/category";
import { IApiResponse } from "../../models/common";
import { IAction } from "../../store/useStore";
import categoryApiClient from "../api-clients/CategoryApiClient";
import itemApiClient from "../api-clients/ItemApiClient";
import listApiClient from "../api-clients/ListApiClient";
import { actionTypes as categoryAT } from "../../store/category";
import { actionTypes as itemAT } from "../../store/item";
import { actionTypes as listAT } from "../../store/list";
import { Item, ItemSearchParam } from "../../models/item";
import { List, ListSearchParam } from "../../models/list";
import { ListStatus } from "../../common/data";

class CommonService {
    public async loadInitialData(dispatch: (action: IAction) => void, userId: string) {
        const categoryReq = categoryApiClient.search(new CategorySearchParam({ createdById: userId }));
        const itemsReq = itemApiClient.search(new ItemSearchParam({ createdByUserId: userId }));
        const listsReq = listApiClient.search(new ListSearchParam({ createdByUserId: userId }));

        const categoryRes: IApiResponse = await categoryReq;
        const itemRes: IApiResponse = await itemsReq;
        const listsRes: IApiResponse = await listsReq;

        const categories = Object.keys(categoryRes.data).map(k => Category.toModel({ ...categoryRes.data[k], id: k }));
        const items = Object.keys(itemRes.data).map(k => Item.toModel({ ...itemRes.data[k], id: k }));
        const lists = Object.keys(listsRes.data).map(k => List.toModel({ ...listsRes.data[k], id: k }));

        const activeList = lists.find(l => l.status === ListStatus.Active);

        dispatch({ type: categoryAT.searchCategoriesSuccess, payload: categories });
        dispatch({ type: itemAT.searchItemsSuccess, payload: items });
        dispatch({ type: listAT.getActiveListSuccess, payload: activeList });
    }
}

export default new CommonService();
