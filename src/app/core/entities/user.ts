export interface User {
    email: string;
    uid: string;
    verified: boolean;
    terms: boolean;
    creationDate: number | Date;
    firstTime: boolean;
    onTrial?: boolean;
    trialStart?: Date;
    trialEnd?: Date;
}
