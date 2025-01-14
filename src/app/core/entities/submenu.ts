interface Time{
    openingHour: string;
    closingHour: string;
    days: { [name: string] : boolean };
}

export interface Submenu {
    id: string;
    name: string;
    description: string;
    available: boolean;
    categories: Array<string>;
    time: Time;
}
