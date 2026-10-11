export type ClassValue = string | number | false | null | undefined;

/**
 * Joins class names, dropping anything falsy.
 *
 *   joinClasses("btn", size === "sm" && "btn-sm", className)
 */
export function joinClasses(...values: ClassValue[]): string {
  let out = "";
  for (const value of values) {
    if (!value && value !== 0) continue;
    out = out ? `${out} ${value}` : String(value);
  }
  return out;
}

export default joinClasses;
