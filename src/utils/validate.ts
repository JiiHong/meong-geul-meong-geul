export function validateNickname(name: string) {
  const isValid = name.match(/^[가-힣a-zA-Z]+$/g);
  return isValid && name.trim().length > 1 ? true : false;
}
