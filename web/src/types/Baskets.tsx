export interface BasketSort {
    label: string;
    value: string;
}

export interface BasketFilter {
    label: string;
    text: string;
    value: number;
    hidden: boolean;
}

export interface BasketRecord {
    defaultValue: number;
    defaultId: string;
    label: string;
    hidden?: boolean;
}