import { NavigationMenuItem } from "../app/core/generics/Navigation-menu-item"

export const NavigationMenu : Array<NavigationMenuItem> = [
    {
        name: "Productos",
        url: "products",
        icon: "lunch_dining",
    },
    {
        name: "Ventas",
        url: "sales",
        icon: "payments",
    },
    {
        name: "Ordenes",
        url: "orders",
        icon: "receipt",
    },
    {
        name: "Comanda",
        url: "ordering-menu",
        icon: "point_of_sale",
    },
    {
        name: "Configuraciones",
        url: "settings",
        icon: "settings",
    },
]