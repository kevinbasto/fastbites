interface Time{
    openingHour: boolean;
    closingHour: boolean;
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
