export interface EmailTemplateContent {
    subject: string;
    text: string;
    html: string;
    css?: string;
}

export interface PluginEmailTemplate {
    name: string;
    displayName: string;
    description?: string;
    category?: string;
    content: EmailTemplateContent;
}

export interface EmailTemplateProvider {
    getEmailTemplates(): PluginEmailTemplate[] | Promise<PluginEmailTemplate[]>;
}
