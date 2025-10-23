import sysConstants from '@/constants';

export function validateEmail(email: string) {
  const regex = sysConstants.regex.VALID_EMAIL_REGEX;
  return regex.test(email);
}
