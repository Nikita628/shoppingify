import axios, { AxiosResponse } from "axios";

import { constants } from "../../common/data";
import { Category, CategorySearchParam } from "../../models/category";
import { IApiResponse } from "../../models/common";

class CategoryApiClient {
    private endpoint = "category.json";

    public create(category: Category): Promise<AxiosResponse<IApiResponse>> {
        return axios.post<IApiResponse>(`${constants.apiUrl}/${this.endpoint}`, category);
    }

    public search(param: CategorySearchParam): Promise<AxiosResponse<IApiResponse>> {
        let urlParam = "";

        if (param.createdById) {
            urlParam += `?orderBy="createdBy/id"&equalTo="${param.createdById}"`;
        }

        return axios.get<IApiResponse>(`${constants.apiUrl}/${this.endpoint}${urlParam}`);
    }
}

export default new CategoryApiClient();
