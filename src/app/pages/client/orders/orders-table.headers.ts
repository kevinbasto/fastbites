import { TableColumn } from "../../../core/generics/table-column";

export const OrdersTableHeaders : Array<TableColumn> = [
    {
        name: "name",
        displayName: "Nombre"
    },
    {
        name: "total",
        displayName: "Total",
        type: "currency"
    },
    // {
    //     name: "date",
    //     displayName: "Date",
    //     type: "date"
    // },
]