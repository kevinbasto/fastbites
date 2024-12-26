import { TableColumn } from "../../../../../core/generics/table-column";
import { TableConfig } from "../../../../../core/generics/table-config";


export const categoriesTableHeaders : Array<TableColumn> = [
    {
      name: "name",
      displayName: "Nombre"
    }
  ]
  
  export const categoriesTableConfig : TableConfig = {
    create: true,
    pagination: false,
    ordersButton: false,
    options: true
  };