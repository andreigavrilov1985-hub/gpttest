// Author mark. The game refuses to start if the mark is missing or changed.
// Note: this protects against casual copying only; a web game cannot be fully protected.
const CODES = [169, 32, 50, 48, 50, 54, 32, 1040, 1085, 1076, 1088, 1077, 1081, 32, 1043];
export const AUTHOR_MARK = String.fromCharCode(...CODES); // "© 2026 Андрей Г"

export function verifyAuthorMark(doc = document) {
  const meta = doc.querySelector('meta[name="author"]');
  const spots = doc.querySelectorAll('[data-mark]');
  if (!meta || meta.content !== AUTHOR_MARK.slice(7)) return false;
  if (spots.length < 2) return false;
  for (const el of spots) {
    if (!el.textContent.includes(AUTHOR_MARK)) return false;
  }
  return true;
}
