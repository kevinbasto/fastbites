import { TableColumn } from "../../../core/generics/table-column";
import { TableConfig } from "../../../core/generics/table-config";

export const paymentMethodsTableHeaders : Array<TableColumn> = [
    {
        name: "name",
        displayName: "Nombre"
    },
    {
        name: "type",
        displayName: "Tipo de pago"
    },
    {
        name: "fourLastDigits",
        displayName: "Ultimos 4 dígitos"
    }
]

export const paymentMethodsTableConfig : TableConfig = {
    create: true,
    pagination: false,
    ordersButton: false,
    options: true
}