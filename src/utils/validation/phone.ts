export function validateTelephone(value: string): boolean {
  if (!value || typeof value !== 'string') return false;

  const cleanPhone = value.replace(/[()-\s]/g, '');

  if (cleanPhone.length < 10 || cleanPhone.length > 11) return false;

  const telephone = cleanPhone.substring(cleanPhone.length - (cleanPhone.length === 10 ? 8 : 9));

  return (
    (telephone.length === 8 && telephone[0] !== '9') ||
    (telephone.length === 9 && telephone[0] === '9')
  );
}
