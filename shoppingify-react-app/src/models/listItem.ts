import { Item } from "./item";

export class ListItem {
    amount: number;
    isChecked: boolean;    
    item: Item;

    constructor(item?: Partial<ListItem>) {
        if (item) {
            this.amount = item.amount;
            this.isChecked = item.isChecked;
            this.item = item.item;
        }
    }

    static toModel(item: any): ListItem {
        if (!item) return null;

        const newItem = new ListItem();
        newItem.amount = item.amount;
        newItem.isChecked = item.isChecked;
        newItem.item = item.item ? Item.toModel(item.item) : null;

        return newItem;
    }
}