import { TableColumn } from "../../../core/generics/table-column";

export const productTableHeaders : Array<TableColumn> = [
    {
      name: "name",
      displayName: "Nombre"
    },
    {
      name: "cost",
      displayName: "Costo"
    },
    {
      name: "price",
      displayName: "Precio de venta"
    },
    {
      name: "available",
      displayName: "Disponible",
      toggable: true
    },
  ]