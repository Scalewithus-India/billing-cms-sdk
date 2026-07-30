/**
 * Schema types for `theme.json`. Themes are filesystem + Nuxt SSR packages —
 * this module does not provide a theme runtime.
 */

export interface ThemeConfigField {
    identifier: string;
    name: string;
    description?: string;
    type: "text" | "password" | "number" | "boolean" | "select" | "textarea" | "color";
    defaultValue?: string | number | boolean | null;
    required?: boolean;
    options?: Array<{ label: string; value: string | number | boolean }>;
}

export interface ThemeRouteAlias {
    path: string;
    page: string;
    layout?: string;
    title?: string;
}

export interface ThemeMeta {
    name: string;
    version: string;
    author?: string;
    description?: string;
    screenshot?: string;
    /** Parent theme id for child themes */
    parent?: string;
    routes?: ThemeRouteAlias[];
    /** Per-theme Options schema → stored as `theme_config_<themeId>` */
    config?: ThemeConfigField[];
}
