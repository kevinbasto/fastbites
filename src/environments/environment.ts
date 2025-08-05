import { version } from "./version";

export const environment = {
    domain: window.origin,
    apiUrl: 'http://localhost:3000',
    paginationOptions : [ 10, 20, 50 ],
    defaultPageSize: 10,
    version: version,
    landingDomain: "http://fastbites.app",
    adminDomain: "http://admin.fastbites.app",
    menuDomain: "http://menu.fastbites.app",
    staffDomain: "http://localhost:4400"
}