export function normalizeDate(data: string) {
  const splited = data.split("T");
  return splited[0];
}
