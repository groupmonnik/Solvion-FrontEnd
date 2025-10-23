import sysConstants from '@/constants';
import z from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: 'Campo obrigatório',
      })
      .max(120, {
        message: 'O campo deve ter no máximo 120 caracteres',
      }),
    lastName: z
      .string()
      .min(1, {
        message: 'Campo obrigatório',
      })
      .max(120, {
        message: 'O campo deve ter no máximo 120 caracteres',
      }),
    cpf: z
      .string()
      .min(1, {
        message: 'Campo obrigatório',
      })
      .max(15, {
        message: 'O campo deve ter no máximo 15 caracteres',
      })
      .regex(/^\d+$/, {
        message: 'CPF deve conter apenas números',
      }),
    isForeigner: z.boolean(),
    email: z
      .string()
      .min(1, {
        message: 'Campo obrigatório',
      })
      .max(120, {
        message: 'O campo deve ter no máximo 120 caracteres',
      })
      .regex(sysConstants.regex.VALID_EMAIL_REGEX, {
        message: 'E-mail inválido',
      }),
    password: z
      .string()
      .min(1, {
        message: 'Campo obrigatório',
      })
      .max(500, {
        message: 'O campo deve ter no máximo 500 caracteres',
      })
      .regex(sysConstants.regex.PASSWORD_STRONG_REGEX, {
        message:
          'Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&)',
      }),
    passwordConfirm: z
      .string()
      .min(1, {
        message: 'Campo obrigatório',
      })
      .max(500, {
        message: 'O campo deve ter no máximo 500 caracteres',
      }),
    cep: z
      .string()
      .min(1, {
        message: 'Campo obrigatório',
      })
      .max(10, {
        message: 'O campo deve ter no máximo 10 caracteres',
      }),
    address: z
      .string()
      .min(1, {
        message: 'Campo obrigatório',
      })
      .max(200, {
        message: 'O campo deve ter no máximo 200 caracteres',
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  });
