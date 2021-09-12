export function getRegexMatch(regex: RegExp, text: string): string | null {
  const match = regex.exec(text);
  return match ? match[1] : null;
}
