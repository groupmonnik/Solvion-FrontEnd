# Utils Documentation

> **⚠️ IMPORTANT FOR LLM/AI ASSISTANTS**: This documentation must be updated whenever any modification is made to the utils functions. Always keep this file in sync with the implementation.

## Overview

The `src/utils` directory contains utility functions organized into categories: text manipulation, masking, and validation. All utilities are exported through a single `sysUtils` object for easy access and discoverability.

## Table of Contents

- [Installation & Usage](#installation--usage)
- [Text Utilities](#text-utilities)
- [Mask Utilities](#mask-utilities)
- [Validation Utilities](#validation-utilities)
- [File Structure](#file-structure)

---

## Installation & Usage

Import the utilities object:

```typescript
import sysUtils from '@/utils';

// Use text utilities
sysUtils.text.extractOnlyNumbers('(11) 98765-4321'); // '11987654321'

// Use mask utilities
sysUtils.mask.phone({ value: '11987654321' }); // '(11) 98765-4321'

// Use validation utilities
sysUtils.validation.cpf('123.456.789-09'); // true or false
```

---

## Text Utilities

### `extractOnlyNumbers`

**Location**: `src/utils/text/extractOnlyNumbers.ts`

**Description**: Extracts only numeric characters from a string, removing all non-digit characters.

**Parameters**:

- `value` (string): String to extract numbers from

**Returns**: `string` - String containing only numeric characters (0-9)

**Use Cases**:

- Cleaning phone numbers before validation
- Extracting CPF digits
- Sanitizing any numeric input that may contain formatting

**Examples**:

```typescript
sysUtils.text.extractOnlyNumbers('abc123def456');
// Returns: '123456'

sysUtils.text.extractOnlyNumbers('(11) 98765-4321');
// Returns: '11987654321'

sysUtils.text.extractOnlyNumbers('R$ 1.234,56');
// Returns: '123456'

sysUtils.text.extractOnlyNumbers('');
// Returns: ''
```

**Implementation Details**:

- Returns empty string if input is not a string or is empty
- Uses regex `/\D/g` to replace all non-digit characters

---

## Mask Utilities

### `maskNumber`

**Location**: `src/utils/mask/number.ts`

**Description**: Applies a custom mask pattern to a numeric string. The mask uses '#' as placeholder for numeric digits.

**Parameters**:

- `datx` (object):
  - `value` (string): String to be masked (can contain non-numeric characters)
  - `mask` (string): Mask pattern where '#' represents a number placeholder

**Returns**: `string` - Masked string according to the pattern

**Use Cases**:

- Formatting CPF (###.###.###-##)
- Formatting CNPJ (##.###.###/####-##)
- Formatting custom document numbers
- Creating custom number formats

**Examples**:

```typescript
sysUtils.mask.number({ value: '12345678900', mask: '###.###.###-##' });
// Returns: '123.456.789-00' (CPF format)

sysUtils.mask.number({ value: '1234567890123', mask: '##.###.###/####-##' });
// Returns: '12.345.678/9013-45' (CNPJ format)

sysUtils.mask.number({ value: 'abc123def', mask: '###-###' });
// Returns: '123-' (only 3 numbers available)

sysUtils.mask.number({ value: '12345', mask: '' });
// Returns: '12345' (no mask applied)
```

**Implementation Details**:

- Automatically extracts only numbers from input using `extractOnlyNumbers`
- Iterates through mask pattern character by character
- Replaces '#' with digits from the numeric value
- Stops when no more digits are available
- Removes trailing separator if digits run out

---

### `maskPhone`

**Location**: `src/utils/mask/phone.ts`

**Description**: Applies Brazilian phone number format mask. Automatically detects whether it's a landline (10 digits) or mobile (11 digits).

**Parameters**:

- `datx` (object):
  - `value` (string): Phone number string to be masked (with or without formatting)

**Returns**: `string` - Formatted phone number string in Brazilian format

**Formats**:

- **Landline** (10 digits): `(XX) XXXX-XXXX`
- **Mobile** (11 digits): `(XX) XXXXX-XXXX`

**Examples**:

```typescript
sysUtils.mask.phone({ value: '11987654321' });
// Returns: '(11) 98765-4321' (mobile format)

sysUtils.mask.phone({ value: '1133334444' });
// Returns: '(11) 3333-4444' (landline format)

sysUtils.mask.phone({ value: '(21)99999-8888' });
// Returns: '(21) 99999-8888' (cleans and reformats)

sysUtils.mask.phone({ value: '' });
// Returns: ''
```

**Implementation Details**:

- Returns empty string if value is not a string or is empty
- Uses `maskNumber` internally with appropriate mask
- Length < 15: applies landline mask `(##) ####-####`
- Length >= 15: applies mobile mask `(##) #####-####`

---

## Validation Utilities

### `validateCPF`

**Location**: `src/utils/validation/cpf.ts`

**Description**: Validates a Brazilian CPF (Cadastro de Pessoas Físicas) number. Checks format, length, and verification digits.

**Parameters**:

- `cpf` (string): CPF to validate (may contain dots and dashes)

**Returns**: `boolean` - `true` if CPF is valid, `false` otherwise

**Validation Rules**:

1. Must be a string
2. Must have exactly 11 digits (after removing formatting)
3. Cannot have all identical digits (e.g., 111.111.111-11)
4. Must have valid verification digits (calculated using specific algorithm)

**Examples**:

```typescript
sysUtils.validation.cpf('123.456.789-09');
// Returns: true (if verification digits are valid)

sysUtils.validation.cpf('12345678909');
// Returns: true (accepts without formatting)

sysUtils.validation.cpf('111.111.111-11');
// Returns: false (all digits are the same)

sysUtils.validation.cpf('123.456.789-00');
// Returns: false (invalid verification digits)

sysUtils.validation.cpf('123');
// Returns: false (too short)
```

**Implementation Details**:

- Removes spaces, dots, and dashes: `/[\s.-]/g`
- Checks for sequential identical digits: `/^(\d)\1{10}$/`
- Uses `calculateDigit` helper function for verification
- First verification digit uses multiplier starting at 10
- Second verification digit uses multiplier starting at 11

**Algorithm**:

```typescript
// For first digit (position 9):
sum = d[0]*10 + d[1]*9 + d[2]*8 + ... + d[8]*2
remainder = (sum * 10) % 11
digit = remainder >= 10 ? 0 : remainder

// For second digit (position 10):
sum = d[0]*11 + d[1]*10 + d[2]*9 + ... + d[9]*2
remainder = (sum * 10) % 11
digit = remainder >= 10 ? 0 : remainder
```

---

### `validateEmail`

**Location**: `src/utils/validation/email.ts`

**Description**: Validates an email address format using a regex pattern defined in constants.

**Parameters**:

- `email` (string): Email string to validate

**Returns**: `boolean` - `true` if email is **VALID**, `false` if email is **INVALID**

**Examples**:

```typescript
sysUtils.validation.email('user@example.com');
// Returns: true (valid email)

sysUtils.validation.email('user@domain.co.uk');
// Returns: true (valid email)

sysUtils.validation.email('invalid-email');
// Returns: false (invalid - no @ symbol)

sysUtils.validation.email('user@');
// Returns: false (invalid - incomplete domain)

sysUtils.validation.email('');
// Returns: false (invalid - empty string)
```

**Implementation Details**:

- Uses regex from `sysConstants.regex.VALID_EMAIL_REGEX`
- Direct regex test: `regex.test(email)`
- Returns `true` for valid emails, `false` for invalid

**Dependencies**:

- Requires `@/constants` to be properly configured with `VALID_EMAIL_REGEX`

---

### `validateTelephone`

**Location**: `src/utils/validation/phone.ts`

**Description**: Validates a Brazilian phone number. Checks format and digit rules for both landline and mobile numbers.

**Parameters**:

- `value` (string): Phone number to validate (may contain parentheses, dashes and spaces)

**Returns**: `boolean` - `true` if phone is valid, `false` otherwise

**Validation Rules**:

1. Must be a non-empty string
2. Must have 10 or 11 digits (after removing formatting)
3. **Landline** (10 digits): Last 8 digits, first digit must NOT be '9'
4. **Mobile** (11 digits): Last 9 digits, first digit must be '9'

**Examples**:

```typescript
sysUtils.validation.telephone('(11) 98765-4321');
// Returns: true (valid mobile - 11 digits, starts with 9)

sysUtils.validation.telephone('(11) 3333-4444');
// Returns: true (valid landline - 10 digits, doesn't start with 9)

sysUtils.validation.telephone('11987654321');
// Returns: true (accepts without formatting)

sysUtils.validation.telephone('(11) 8765-4321');
// Returns: false (10 digits but starts with 8, not a valid landline pattern)

sysUtils.validation.telephone('123');
// Returns: false (too short)

sysUtils.validation.telephone('');
// Returns: false (empty string)
```

**Implementation Details**:

- Removes formatting characters: `/[()-\s]/g`
- Accepts only 10 or 11 digit numbers
- Extracts telephone part (excluding area code):
  - 10 digits: last 8 digits
  - 11 digits: last 9 digits
- Validates based on first digit of telephone part:
  - 8 digits: first digit != '9' (landline)
  - 9 digits: first digit == '9' (mobile)

---

## File Structure

```
src/utils/
├── index.ts                      # Main export with sysUtils object
├── text/
│   └── extractOnlyNumbers.ts     # Extract numeric characters
├── mask/
│   ├── number.ts                 # Generic number masking
│   └── phone.ts                  # Brazilian phone masking
└── validation/
    ├── cpf.ts                    # Brazilian CPF validation
    ├── email.ts                  # Email format validation
    └── phone.ts                  # Brazilian phone validation
```

---

## Best Practices

### When to Use Each Utility

**Text Utilities**:

- Use `extractOnlyNumbers` before applying masks or validations
- Clean user input before processing

**Mask Utilities**:

- Use for displaying formatted values to users
- Apply masks in input fields for better UX
- Use `maskNumber` for custom document formats
- Use `maskPhone` specifically for Brazilian phone numbers

**Validation Utilities**:

- Always validate user input before submission
- Use after extracting numbers for accurate validation
- Combine with masks for real-time feedback

### Common Patterns

**Input Formatting**:

```typescript
// Clean, validate, then mask
const handlePhoneInput = (value: string) => {
  const cleaned = sysUtils.text.extractOnlyNumbers(value);
  const isValid = sysUtils.validation.telephone(cleaned);
  const masked = sysUtils.mask.phone({ value: cleaned });

  return { isValid, masked };
};
```

**Form Validation**:

```typescript
// Validate before submission
const validateForm = (data) => {
  const isCPFValid = sysUtils.validation.cpf(data.cpf);
  const isEmailValid = sysUtils.validation.email(data.email);
  const isPhoneValid = sysUtils.validation.telephone(data.phone);

  return isCPFValid && isEmailValid && isPhoneValid;
};
```

---

## Maintenance Notes

### For LLM/AI Assistants

**⚠️ CRITICAL**: When modifying any utility function:

1. ✅ Update the function implementation
2. ✅ Update JSDoc in `src/utils/index.ts`
3. ✅ Update this `README.md` documentation
4. ✅ Add/update examples if behavior changes
5. ✅ Update validation rules if logic changes
6. ✅ Run tests if available

**Common Modifications**:

- **Adding a new utility**: Create file, add to index.ts, document here
- **Changing validation logic**: Update implementation, examples, and rules
- **Modifying return values**: Update all examples and type definitions
- **Fixing bugs**: Document the fix and update examples if needed

### Version History

- **Current Version**: Initial implementation
- **Last Updated**: October 3, 2025
- **Contributors**: Development Team

---

## Testing

When adding or modifying utilities, consider testing:

- ✅ Empty strings and null values
- ✅ Invalid input types
- ✅ Edge cases (very long strings, special characters)
- ✅ Valid and invalid examples
- ✅ Formatting preservation/removal

---

## Dependencies

- `@/constants`: Required for regex patterns (email validation)
- React/TypeScript project setup

---

**Last Updated**: October 3, 2025  
**Maintained by**: Development Team
