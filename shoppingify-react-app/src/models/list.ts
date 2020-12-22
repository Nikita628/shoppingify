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
}