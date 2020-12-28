import axios, { AxiosResponse } from "axios";

import { constants } from "../../common/data";
import { IApiResponse } from "../../models/common";
import { List, ListSearchParam } from "../../models/list";

class ListApiClient {
    private endpoint = "list.json";

    public create(list: List): Promise<AxiosResponse<IApiResponse>> {
        return axios.post<IApiResponse>(`${constants.apiUrl}/${this.endpoint}`, list);
    }

    public update(list: List): Promise<AxiosResponse<IApiResponse>> {
        return axios.put<IApiResponse>(`${constants.apiUrl}/list/${list.id}.json`, list);
    }

    public search(param: ListSearchParam): Promise<AxiosResponse<IApiResponse>> {
        let urlParam = "";

        if (param.createdByUserId) {
            urlParam += `?orderBy="createdBy/id"&equalTo="${param.createdByUserId}"`;
        }

        return axios.get<IApiResponse>(`${constants.apiUrl}/${this.endpoint}${urlParam}`);
    }
}

export default new ListApiClient();
