import { NavigationMenuItem } from "../app/core/generics/Navigation-menu-item"

export const NavigationMenu : Array<NavigationMenuItem> = [
    {
        name: "Menu",
        url: "menu",
        icon: "menu_book",
    },
    {
        name: "Personalizar",
        url: "personalization",
        icon: "palette",
    },
    {
        name: "Comanda",
        url: "orderslip",
        icon: "point_of_sale",
    },
    {
        name: "Ordenes",
        url: "orders",
        icon: "receipt",
    },
    {
        name: "Ventas",
        url: "sales",
        icon: "payments",
    },
    {
        name: "Configuraciones",
        url: "settings",
        icon: "settings",
    },
    // {
    //     name: 'Promociones',
    //     url: 'promos',
    //     icon: 'sell'
    // },
    // {
    //     name: 'Empleados',
    //     url: 'staff',
    //     icon: 'groups'
    // },
]