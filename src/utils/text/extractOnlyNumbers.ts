export function extractOnlyNumbers(value: string): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  return value.replace(/\D/g, '');
}
