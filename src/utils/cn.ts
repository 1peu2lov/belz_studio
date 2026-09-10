/**
 * Concatène des classes CSS conditionnelles.
 * Utile pour composer des className à partir de CSS Modules.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
