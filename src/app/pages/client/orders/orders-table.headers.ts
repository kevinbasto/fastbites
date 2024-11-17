import { TableColumn } from "../../../core/generics/table-column";

export const OrdersTableHeaders : Array<TableColumn> = [
    {
        name: "name",
        displayName: "Nombre"
    },
    {
        name: "date",
        displayName: "Date",
        type: "date"
    },
]