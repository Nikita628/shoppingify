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
}