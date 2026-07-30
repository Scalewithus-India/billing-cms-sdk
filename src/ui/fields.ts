export enum ECustomFieldType {
    text = "text",
    link = "link",
    password = "password",
    dropdown = "dropdown",
    tickbox = "tickbox",
    textarea = "textarea",
    domain = "domain",
    grouped_select = "grouped_select",
}

export interface SelectOption {
    key?: string;
    value?: string;
}

export interface GroupedSelectOption {
    key: string;
    value: string;
    icon?: string;
}

export interface GroupedSelectGroup {
    key?: string;
    name: string;
    icon?: string;
    order?: number;
    options?: GroupedSelectOption[];
}

export interface ICustomField {
    name: string;
    type: ECustomFieldType;
    description: string;
    validation: string;
    displayOrder: number;
    adminOnly: boolean;
    requiredField: boolean;
    showOnOrderForm: boolean;
    showOnInvoice: boolean;
    _id?: string;
    value?: string;
    selectOptions: SelectOption[];
    optionGroups?: GroupedSelectGroup[];
    identifier: string;
}
