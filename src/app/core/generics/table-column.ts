export interface TableColumn {
    name: string; 
    displayName: string;
    type?: "currency" | "date"
    toggable? : boolean;
}