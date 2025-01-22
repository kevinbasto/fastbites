import { TableColumn } from "../../../core/generics/table-column";
import { TableConfig } from "../../../core/generics/table-config";


export const schedulesTableHeaders : Array<TableColumn> = [
    {
        name: 'openingHour',
        displayName: 'Hora de apertura',
    },
    {
        name: 'closingHour',
        displayName: 'Hora de cierre',
    },
    {
        name: 'available',
        displayName: 'Disponible',
        toggable: true
    },
];

export const schedulesTableConfig : TableConfig = {
    create: false,
    pagination: false,
    ordersButton: false,
    options: true
}