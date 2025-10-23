import { maskNumber } from './mask/number';
import { maskPhone } from './mask/phone';
import { extractOnlyNumbers } from './text/extractOnlyNumbers';
import { validateCPF } from './validation/cpf';
import { validateEmail } from './validation/email';

const sysUtils = {
  /**
   * Text manipulation utilities.
   */
  text: {
    /**
     * Extracts only numeric characters from a string, removing all non-digit characters.
     * Useful for cleaning phone numbers, CPF, or any input that should contain only numbers.
     * @param value - String to extract numbers from
     * @returns String containing only numeric characters (0-9)
     * @example
     * extractOnlyNumbers('abc123def456')
     * // Returns: '123456'
     * @example
     * extractOnlyNumbers('(11) 98765-4321')
     * // Returns: '11987654321'
     * @example
     * extractOnlyNumbers('R$ 1.234,56')
     * // Returns: '123456'
     */
    extractOnlyNumbers,
  },
  /**
   * Masking utilities for formatting strings.
   */
  mask: {
    /**
     * Applies a custom mask pattern to a numeric string.
     * The mask uses '#' as placeholder for numeric digits.
     * Automatically extracts only numbers from the input value before applying the mask.
     * @param datx - Object containing the value and mask pattern
     * @param datx.value - String to be masked (can contain non-numeric characters)
     * @param datx.mask - Mask pattern where '#' represents a number placeholder
     * @returns Masked string according to the pattern
     * @example
     * maskNumber({ value: '12345678900', mask: '###.###.###-##' })
     * // Returns: '123.456.789-00'
     * @example
     * maskNumber({ value: '1234567890123', mask: '##.###.###/####-##' })
     * // Returns: '12.345.678/9013-45'
     * @example
     * maskNumber({ value: 'abc123def', mask: '###-###' })
     * // Returns: '123-' (only 3 numbers available)
     */
    number: maskNumber,
    /**
     * Applies Brazilian phone number format mask.
     * Automatically detects whether it's a landline (10 digits) or mobile (11 digits).
     * Landline format: (XX) XXXX-XXXX
     * Mobile format: (XX) XXXXX-XXXX
     * @param datx - Object containing the phone value
     * @param datx.value - Phone number string to be masked (with or without formatting)
     * @returns Formatted phone number string in Brazilian format
     * @example
     * maskPhone({ value: '11987654321' })
     * // Returns: '(11) 98765-4321' (mobile)
     * @example
     * maskPhone({ value: '1133334444' })
     * // Returns: '(11) 3333-4444' (landline)
     * @example
     * maskPhone({ value: '(21)99999-8888' })
     * // Returns: '(21) 99999-8888' (cleans and reformats)
     */
    phone: maskPhone,
  },
  /**
   * Validation utilities for common data formats.
   */
  validation: {
    /**
     * Validates a Brazilian CPF (Cadastro de Pessoas Físicas) number.
     * Checks if the CPF has the correct format, length, and valid verification digits.
     * Rejects CPFs with all identical digits (e.g., 111.111.111-11).
     * Accepts CPF with or without formatting (dots and dashes).
     * @param cpf - CPF to validate (may contain dots and dashes)
     * @returns True if CPF is valid, false otherwise
     * @example
     * validateCPF('123.456.789-09')
     * // Returns: true (if valid)
     * @example
     * validateCPF('12345678909')
     * // Returns: true (accepts without formatting)
     * @example
     * validateCPF('111.111.111-11')
     * // Returns: false (all digits are the same)
     * @example
     * validateCPF('123.456.789-00')
     * // Returns: false (invalid verification digits)
     */
    cpf: validateCPF,
    /**
     * Validates an email address format using regex pattern.
     * @param email - Email string to validate
     * @returns True if email is VALID, false if email is INVALID
     * @example
     * validateEmail('user@example.com')
     * // Returns: true (valid email)
     * @example
     * validateEmail('user@domain.co.uk')
     * // Returns: true (valid email)
     * @example
     * validateEmail('invalid-email')
     * // Returns: false (invalid email - no @ symbol)
     * @example
     * validateEmail('user@')
     * // Returns: false (invalid email - incomplete domain)
     */
    email: validateEmail,
  },
} as const;

export default sysUtils;
