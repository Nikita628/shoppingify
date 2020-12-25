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
}