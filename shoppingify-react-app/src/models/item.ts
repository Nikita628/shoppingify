import { Category } from "./category";
import { User } from "./user";

export class Item {
    id: string;
    name: string;
    note: string;
    imgUrl: string;
    createdDate: Date;
    category: Category;
    createdBy: User;

    constructor(item?: Partial<Item>) {
        if (item) {
            this.id = item.id;
            this.name = item.name;
            this.createdDate = item.createdDate;
            this.createdBy = item.createdBy;
            this.note = item.note;
            this.imgUrl = item.imgUrl;
            this.category = item.category;
        }
    }

    static toModel(item: any): Item {
        if (!item) return null;

        const newItem = new Item();
        newItem.id = item.id;
        newItem.name = item.name;
        newItem.note = item.note;
        newItem.imgUrl = item.imgUrl;
        newItem.category = item.category ? Category.toModel(item.category) : null;
        newItem.createdDate = item.createdDate ? new Date(item.createdDate) : null;
        newItem.createdBy = item.createdBy ? User.toModel(item.createdBy) : null;

        return newItem;
    }
}

export class ItemSearchParam {
    createdByUserId: string;

    constructor(item?: Partial<ItemSearchParam>) {
        if (item) {
            this.createdByUserId = item.createdByUserId;
        }
    }
}