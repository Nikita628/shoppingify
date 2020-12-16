import axios, { AxiosResponse } from "axios";

import { constants } from "../../common/data";
import { SigninResponse, SignupResponse } from "../../models/auth";

class AuthApiClient {
    private endpoint = "https://identitytoolkit.googleapis.com/v1/accounts:";

    public signup(email: string, password: string): Promise<AxiosResponse<SignupResponse>> {
        return axios.post<SignupResponse>(`${this.endpoint}signUp?key=${constants.apiKey}`, { email, password, returnSecureToken: true });
    }

    public signin(email: string, password: string): Promise<AxiosResponse<SigninResponse>> {
        return axios.post<SigninResponse>(`${this.endpoint}signInWithPassword?key=${constants.apiKey}`, { email, password, returnSecureToken: true });
    }
}

export default new AuthApiClient();
