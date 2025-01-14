import { Plan } from "../app/core/entities/plan";

export const plans: Array<Plan> = [
  {
    id: "menu-digital",
    title: "Menú Digital",
    subtitle: `Tus comensales no son hormigas, ¿por qué darles un menú de hormiga?`,
    description: `Digitaliza tu menú de forma sencilla y profesional.`,
    perks: [
      "Diseño atractivo",
      "Fácil de usar",
      "Accesible desde cualquier dispositivo"
    ],
    price: 300,
    permissions: {},
    stripeId: "prod_RUEGFUa5cFL9dr"
  },
  {
    id: "menu-comanda",
    title: "Menú con Comanda",
    subtitle: `Gestión efectiva, al alcance de tus manos`,
    description: "Gestión eficiente con menú digital y registro de comandas.",
    perks: ["Menú digital", "Gestión de órdenes", "Optimización del servicio"],
    price: 500,
    permissions: {},
    stripeId: "prod_RUEGHV48VawlLX"
  },
];