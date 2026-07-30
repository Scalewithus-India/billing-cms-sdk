/** Option key used by the host for per-theme config JSON. */
export function themeConfigOptionKey(themeId: string): string {
    return `theme_config_${themeId}`;
}
