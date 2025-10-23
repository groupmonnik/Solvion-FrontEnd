export function validateCPF(cpf: string): boolean {
  if (typeof cpf !== 'string') return false;

  const cleanCPF = cpf.replace(/[\s.-]/g, '');

  if (cleanCPF.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  const digits = cleanCPF.split('').map(Number);

  const firstDigit = calculateDigit(digits.slice(0, 9), 10);
  if (firstDigit !== digits[9]) return false;

  const secondDigit = calculateDigit(digits.slice(0, 10), 11);
  if (secondDigit !== digits[10]) return false;

  return true;
}

function calculateDigit(digits: number[], multiplier: number): number {
  const sum = digits.reduce((acc, digit, index) => {
    return acc + digit * (multiplier - index);
  }, 0);

  const remainder = (sum * 10) % 11;
  return remainder === 10 || remainder === 11 ? 0 : remainder;
}
