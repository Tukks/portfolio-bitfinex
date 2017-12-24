
export function isNullNumber(data: number) {
  if (data === 0) {
    return false;
  } else if (!data) {
    return true;
  }
  return false;
}
