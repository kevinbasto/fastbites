import { TableColumn } from "../../../core/generics/table-column";
import { TableConfig } from "../../../core/generics/table-config";

export const productTableHeaders: Array<TableColumn> = [
  {
    name: "name",
    displayName: "Nombre"
  },
  {
    name: "cost",
    displayName: "Costo",
    type: "currency"
  },
  {
    name: "price",
    displayName: "Precio de venta",
    type: "currency"
  },
  {
    name: "available",
    displayName: "Disponible",
    toggable: true
  },
]

export const productTableConfig : TableConfig = {
  create: true,
  pagination: false,
  ordersButton: true,
  options: true
};