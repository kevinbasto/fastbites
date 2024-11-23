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

export const MonthSalesTableHeaders : Array<TableColumn> = [
    {
        name: "date",
        displayName: "Fecha",
        type: "date"
    },
    {
        name: "name",
        displayName: "Nombre",
    },
    {
        name: "total",
        displayName: "Total de venta",
        type: "currency"
    }
]