export function cleanString(text: string) {
  text = text.toLowerCase();
  text = text.replaceAll(/[':; -]/g, "");
  text.trim();
  return text;
}
