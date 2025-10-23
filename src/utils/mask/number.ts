import { extractOnlyNumbers } from '../text/extractOnlyNumbers';

export function maskNumber(datx: { value: string; mask: string }): string {
  const { value, mask } = datx;

  if (!mask) return value;

  const numericValue = extractOnlyNumbers(value);

  let maskedValue = '';
  let numericIndex = 0;

  for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
    if (numericIndex >= numericValue.length) {
      if (maskIndex === 0) break;

      if (maskIndex > 0 && mask[maskIndex - 1] !== '#') {
        maskedValue = maskedValue.slice(0, -1);
      }
      break;
    }

    if (mask[maskIndex] === '#') {
      maskedValue += numericValue[numericIndex];
      numericIndex++;
    } else {
      maskedValue += mask[maskIndex];
    }
  }

  return maskedValue;
}
