import { Employee } from "./employee";
import { Group } from "./group";

export interface Staff {
    employees: Array<Employee>;
    groups: Array<Group>;
}
