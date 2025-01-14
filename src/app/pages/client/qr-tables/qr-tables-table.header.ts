import { TableColumn } from "../../../core/generics/table-column";
import { TableConfig } from "../../../core/generics/table-config";

export const QrTablesTableHeaders : Array<TableColumn> = [
    {
        name: 'name',
        displayName: 'Nombre'
    },
    {
        name: 'available',
        displayName: 'Disponible'
    },
]

export const QrTablesTableConfig : TableConfig = {
    create: false,
    pagination: false,
    ordersButton: false,
    options: false
}