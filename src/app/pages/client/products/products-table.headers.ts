import { TableColumn } from "../../../core/generics/table-column";

export const productTableHeaders : Array<TableColumn> = [
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