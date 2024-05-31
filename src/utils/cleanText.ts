export function removePlattform(text: string) {
  return text.replace(/\(mac\)/gi, "");
}

export function lowerCaseNoSpace(word: string) {
  return word.toLowerCase().trim().replace(/\s/g, "");
}
