import { TableColumn } from "../../../../../core/generics/table-column";
import { TableConfig } from "../../../../../core/generics/table-config";

export const GroupsTableHeaders : Array<TableColumn> = [
    {
        name: 'name',
        displayName: 'Nombre'
    },
    {
        name: 'email',
        displayName: 'Correo'
    },
    {
        name: 'phone',
        displayName: 'Teléfono'
    },
    {
        name: 'role',
        displayName: 'Rol'
    }
];

export const GroupsTableConfig: TableConfig = {
    create: false,
    pagination: false,
    ordersButton: false,
    options: true
}