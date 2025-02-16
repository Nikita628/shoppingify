import axios, { AxiosResponse } from "axios";

import { constants } from "../../common/data";
import { Item, ItemSearchParam } from "../../models/item";
import { IApiResponse } from "../../models/common";

class ItemApiClient {
    private endpoint = "item.json";

    public create(item: Item): Promise<AxiosResponse<IApiResponse>> {
        return axios.post<IApiResponse>(`${constants.apiUrl}/${this.endpoint}`, item);
    }

    public delete(itemId: string): Promise<AxiosResponse<IApiResponse>> {
        return axios.delete<IApiResponse>(`${constants.apiUrl}/item/${itemId}.json`);
    }

    public search(param: ItemSearchParam): Promise<AxiosResponse<IApiResponse>> {
        let urlParam = "";

        if (param.createdByUserId) {
            urlParam += `?orderBy="createdBy/id"&equalTo="${param.createdByUserId}"`;
        }

        return axios.get<IApiResponse>(`${constants.apiUrl}/${this.endpoint}${urlParam}`);
    }
}

export default new ItemApiClient();
