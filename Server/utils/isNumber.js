export function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

console.log(isNumeric("abcd")); // false
console.log(isNumeric("123a")); // false
console.log(isNumeric("1")); // true
console.log(isNumeric("1234567890")); // true
console.log(isNumeric("-23")); // true
console.log(isNumeric(1234)); // true
console.log(isNumeric("123.4")); // false
console.log(isNumeric("")); // false
console.log(isNumeric(undefined)); // false
console.log(isNumeric(null)); // false
