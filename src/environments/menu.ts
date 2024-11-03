import { NavigationMenuItem } from "../app/core/entities/Navigation-menu-item"

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
        icon: "point_of_sale",
    }
]