export function normalizeData(data: string) {
  const splited = data.split("T");
  return splited[0];
}
