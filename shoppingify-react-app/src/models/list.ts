import { ListStatus } from "../common/data";
import { ListItem } from "./listItem";
import { User } from "./user";

export class List {
    id: string;
    name: string;
    createdDate: Date;
    status: ListStatus;
    createdBy: User;
    items: ListItem[];

    constructor(item?: Partial<List>) {
        if (item) {
            this.id = item.id;
            this.name = item.name;
            this.createdDate = item.createdDate;
            this.createdBy = item.createdBy;
            this.status = item.status;
            this.items = item.items;
        }
    }

    static toModel(item: any): List {
        if (!item) return null;

        const newItem = new List();
        newItem.id = item.id;
        newItem.name = item.name;
        newItem.status = item.status;
        newItem.createdDate = item.createdDate ? new Date(item.createdDate) : null;
        newItem.createdBy = item.createdBy ? User.toModel(item.createdBy) : null;

        if (item.items) {
            newItem.items = [];
            Object.keys(item.items).map((k: string) => newItem.items.push(ListItem.toModel(item.items[k])))
        }

        // newItem.items = item.items ? item.items.map((i: any) => ListItem.toModel(i)) : null;

        return newItem;
    }
}

export class ListSearchParam {
    createdByUserId?: string;
    status?: ListStatus;

    constructor(item?: Partial<ListSearchParam>) {
        if (item) {
            this.createdByUserId = item.createdByUserId;
            this.status = item.status;
        }
    }
}