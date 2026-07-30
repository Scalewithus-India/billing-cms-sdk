/**
 * Soft compatibility ranges. Host warns on mismatch at load; never hard-fails.
 * Declare in `plugin.json` and/or `package.json` `engines`.
 */
export interface PluginEngines {
    /** Semver range for billing-cms-sdk (alias: `sdk`) */
    "billing-cms-sdk"?: string;
    sdk?: string;
    /** Semver range for the Billing CMS host (alias: `billingCms`) */
    "billing-cms"?: string;
    billingCms?: string;
    [key: string]: string | undefined;
}

function parseVersion(v: string): [number, number, number] | null {
    const cleaned = String(v).trim().replace(/^v/, "").split("-")[0];
    const parts = cleaned.split(".").map((p) => parseInt(p, 10));
    if (parts.length < 1 || parts.some((n) => Number.isNaN(n))) return null;
    return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
}

function cmp(a: [number, number, number], b: [number, number, number]): number {
    for (let i = 0; i < 3; i++) {
        if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
    }
    return 0;
}

function satisfiesSingle(ver: [number, number, number], range: string): boolean {
    if (range === "*") return true;

    const caret = range.match(/^\^(.+)$/);
    if (caret) {
        const base = parseVersion(caret[1]);
        if (!base) return true;
        if (cmp(ver, base) < 0) return false;
        if (base[0] > 0) return ver[0] === base[0];
        if (base[1] > 0) return ver[0] === 0 && ver[1] === base[1];
        return ver[0] === 0 && ver[1] === 0 && ver[2] === base[2];
    }

    const tilde = range.match(/^~(.+)$/);
    if (tilde) {
        const base = parseVersion(tilde[1]);
        if (!base) return true;
        if (cmp(ver, base) < 0) return false;
        return ver[0] === base[0] && ver[1] === base[1];
    }

    const op = range.match(/^(>=|<=|>|<|=)\s*(.+)$/);
    if (op) {
        const base = parseVersion(op[2]);
        if (!base) return true;
        const c = cmp(ver, base);
        switch (op[1]) {
            case ">=":
                return c >= 0;
            case "<=":
                return c <= 0;
            case ">":
                return c > 0;
            case "<":
                return c < 0;
            case "=":
                return c === 0;
        }
    }

    const exact = parseVersion(range);
    if (exact) return cmp(ver, exact) === 0;
    return true;
}

/** Check whether `version` satisfies a semver range (`^`, `~`, `>=`, exact, `||`). */
export function satisfiesRange(version: string, range: string): boolean {
    const rangeTrim = String(range || "").trim();
    if (!rangeTrim || rangeTrim === "*") return true;

    const ver = parseVersion(version);
    if (!ver) return true;

    const alts = rangeTrim.split("||").map((s) => s.trim()).filter(Boolean);
    return alts.some((alt) => satisfiesSingle(ver, alt));
}

export function resolvePluginEngines(
    metaEngines?: PluginEngines | null,
    packageEngines?: PluginEngines | null,
): PluginEngines | undefined {
    if (!metaEngines && !packageEngines) return undefined;
    return {
        ...(packageEngines || {}),
        ...(metaEngines || {}),
    };
}
