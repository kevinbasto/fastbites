import { TableColumn } from "../../../core/generics/table-column";
import { TableConfig } from "../../../core/generics/table-config";

export const paymentMethodsTableHeaders : Array<TableColumn> = []

export const paymentMethodsTableConfig : TableConfig = {
    create: false,
    pagination: false,
    ordersButton: false,
    options: false
}