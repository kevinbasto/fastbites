import { TableColumn } from "../../../core/generics/table-column";
import { TableConfig } from "../../../core/generics/table-config";

export const gallerytableHeaders : Array<TableColumn> = [
    {
        name: 'name',
        displayName: 'nombre',
    },
    {
        name: 'available',
        displayName: 'Disponible',
    },
];

export const galleryTableConfig: TableConfig = {
    create: false,
    pagination: false,
    ordersButton: false,
    options: true,
}