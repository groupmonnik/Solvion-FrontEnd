import { maskNumber } from './number';

export function maskPhone(datx: { value: string }) {
  const { value } = datx;

  if (!value || typeof value !== 'string') return '';

  if (value.length < 15) return maskNumber({ value, mask: '(##) ####-####' });
  if (value.length >= 15) return maskNumber({ value, mask: '(##) #####-####' });
}
