import { TableColumn } from "../../../core/generics/table-column"
import { TableConfig } from "../../../core/generics/table-config"

export const  announcementsTableHeaders : Array<TableColumn> = [
    {
        name: 'name',
        displayName: 'Nombre'
    },
    {
        name: 'startDate',
        displayName: 'Fecha de publicación'
    },
    {
        name: 'endDate',
        displayName: 'Fecha de caducidad'
    },
    {
        name: 'available',
        displayName: 'Disponible',
        toggable: true
    },
];

export const  announcementsTableConfig : TableConfig = {
    create: false,
    pagination: false,
    ordersButton: false,
    options: true
};