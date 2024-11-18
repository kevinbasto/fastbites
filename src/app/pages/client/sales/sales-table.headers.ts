import { TableColumn } from "../../../core/generics/table-column";

export const salesTableHeaders : Array<TableColumn> = [
    {
        name: "name",
        displayName: "Nombre"
    },
    {
        name: "total",
        displayName: "Total",
        type: "currency"
    },
    {
        name: "date",
        displayName: "Fecha de venta",
        type: "date"
    }
]