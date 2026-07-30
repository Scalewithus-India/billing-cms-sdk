export interface BackendProviderConfig {
    type: string;
    identifier: string;
    name: string;
    description: string;
    defaultValue?: any;
    required?: boolean;
    validation?: string;
}
