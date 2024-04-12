export function cleanString(text: string) {
  return text.replace(/\(mac\)/gi, "");
}
