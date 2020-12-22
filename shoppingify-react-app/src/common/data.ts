export const constants = {
    apiKey: "AIzaSyDhiyR22j4oPJsA7HEFbVNUsFb61I-xV34",
    tokenStorageKey: "shoppingify-app-token",
    tokenExpDateStorageKey: "shoppingify-app-token-exp-date",
    currentUserIdStorageKey: "shoppingify-app-user-id",
    currentUserEmailStorageKey: "shoppingify-app-user-email",
    apiUrl: "https://shoppingify-32fa1-default-rtdb.firebaseio.com",
};

export enum SideDrawerMode {
    ListCreation = 1,
    ListCompletion = 2,
    ItemDetails = 3,
    ItemCreation = 4,
}

export enum ListStatus {
    Active = 1,
    Completed = 2,
    Canceled = 3,
}
