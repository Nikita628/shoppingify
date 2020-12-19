import { constants } from "../../common/data";
import { SigninResponse } from "../../models/auth";

class AuthService {
    public tryLoginFromLocalStorage(): boolean {
        const token = localStorage.getItem(constants.tokenStorageKey);
        const userId = localStorage.getItem(constants.currentUserIdStorageKey);
        const tokenExpDate = localStorage.getItem(constants.tokenExpDateStorageKey);

        if (!token || !userId || !tokenExpDate) return false;

        const expiresIn = +tokenExpDate - new Date().getTime();

        if (expiresIn <= 0) return false;

        const newExpDate = (new Date().getTime() + expiresIn).toString();
        localStorage.setItem(constants.tokenExpDateStorageKey, newExpDate);

        this.autoLogoutAfterTimeout(expiresIn);

        return true;
    };

    public autoLogoutAfterTimeout(timeoutMs: number): void {
        setTimeout(() => {
            this.logout();
        }, timeoutMs);
    }

    public setAuthIntoLocalStorage(res: SigninResponse): void {
        localStorage.setItem(constants.tokenStorageKey, res.idToken);
        localStorage.setItem(constants.currentUserIdStorageKey, res.localId);
        const hourFromNow = (new Date().getTime() + 3_600_000).toString();
        localStorage.setItem(constants.tokenExpDateStorageKey, hourFromNow);
        this.autoLogoutAfterTimeout(+hourFromNow - 300_000);
    }

    public clearAuthFromLocalStorage(): void {
        localStorage.removeItem(constants.tokenStorageKey);
        localStorage.removeItem(constants.tokenExpDateStorageKey);
        localStorage.removeItem(constants.currentUserIdStorageKey);
    }

    public logout(): void {
        this.clearAuthFromLocalStorage();
        window.location.reload();
    }
}

export default new AuthService();
