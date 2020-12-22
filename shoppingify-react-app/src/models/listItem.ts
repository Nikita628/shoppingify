import { Item } from "./item";

export class ListItem {
    id: string;
    amount: number;
    isChecked: boolean;
    listId: string;
    
    item: Item;
}