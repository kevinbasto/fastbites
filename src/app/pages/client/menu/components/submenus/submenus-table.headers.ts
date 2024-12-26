import { TableColumn } from "../../../../../core/generics/table-column";
import { TableConfig } from "../../../../../core/generics/table-config";

export const submenusTableHeaders: Array<TableColumn> = [
  {
    name: "name",
    displayName: "Nombre"
  },
  {
    name: 'available',
    displayName: "Disponible"
  }
]

export const submenusTableConfig : TableConfig = {
  create: true,
  pagination: false,
  ordersButton: false,
  options: true
};