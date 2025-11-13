export function splitAddress(address: string) {
  const splited = address.split(",");
  const result = {
    country: splited[0].trim(),
    city: splited[1].trim(),
    street: splited[2].trim(),
    streetNumber: splited[3].trim(),
  };

  return result;
}
