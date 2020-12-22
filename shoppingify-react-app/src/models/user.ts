export class User {
    id: string;
    email: string;

    constructor(item?: Partial<User>) {
        if (item) {
            this.id = item.id;
            this.email = item.email;
        }
    }

    static toModel(item: any): User {
        if (!item) return null;

        const newUser = new User();
        newUser.id = item.id;
        newUser.email = item.email;

        return newUser;
    }
}