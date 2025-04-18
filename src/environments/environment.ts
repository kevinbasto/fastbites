import { version } from "./version";

export const environment = {
    domain: window.origin,
    apiUrl: 'http://localhost:3000',
    paginationOptions : [ 10, 20, 50 ],
    defaultPageSize: 10,
    version: version,
    landingDomain: "fastbites.app",
    adminDomain: "admin.fastbites.app",
    menuDomain: "menu.fastbites.app",
}