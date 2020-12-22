import { IdName } from "./common";
import { User } from "./user";

export class Category implements IdName {
    id: string;
    name: string;
    createdDate: Date;

    createdBy: User;

    constructor(item?: Partial<Category>) {
        if (item) {
            this.id = item.id;
            this.name = item.name;
            this.createdDate = item.createdDate;
            this.createdBy = item.createdBy;
        }
    }

    static toModel(item: any): Category {
        if (!item) return null;

        const newCategory = new Category();
        newCategory.id = item.id;
        newCategory.name = item.name;
        newCategory.createdDate = item.createdDate ? new Date(item.createdDate) : null;
        newCategory.createdBy = item.createdBy ? User.toModel(item.createdBy) : null;

        return newCategory;
    }
}

export class CategorySearchParam {
    createdById?: string;

    constructor(item?: Partial<CategorySearchParam>) {
        if (item) {
            this.createdById = item.createdById;
        }
    }
}