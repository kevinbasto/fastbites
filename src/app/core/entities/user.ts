export interface User {
    email: string;
    uid: string;
    verified: boolean;
    terms: boolean;
    creationDate: number | Date;
}
