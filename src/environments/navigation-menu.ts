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
        name: 'QR y mesas',
        url: 'qrtables',
        icon: 'qr_code_2'
    },
    {
        name: "Configuraciones",
        url: "settings",
        icon: "settings",
    },
    {
        name: 'Horarios',
        url: 'schedule',
        icon: 'schedule',
    },
    {
        name: 'Galería',
        url: 'gallery',
        icon: 'image',
    },
    {
        name: 'Anuncios',
        url: 'announcements',
        icon: 'campaign',
    }
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