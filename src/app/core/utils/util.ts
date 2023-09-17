import { SelectItem } from "primeng/api";

export function enumToSelectItems(enumParam: {}): SelectItem[] {
    return Object.keys(enumParam).map((key) => ({
        value: key,
        label: enumParam[key],
    }));
}
