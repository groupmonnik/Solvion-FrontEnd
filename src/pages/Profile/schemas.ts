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
    phone: z
      .string()
      .min(1, {
        message: 'Campo obrigatório',
      })
      .max(20, {
        message: 'O campo deve ter no máximo 20 caracteres',
      }),
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
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      const hasCurrentPassword = data.currentPassword && data.currentPassword.length > 0;
      const hasNewPassword = data.newPassword && data.newPassword.length > 0;
      const hasConfirmPassword = data.confirmPassword && data.confirmPassword.length > 0;

      if (hasCurrentPassword || hasNewPassword || hasConfirmPassword) {
        return hasCurrentPassword && hasNewPassword && hasConfirmPassword;
      }

      return true;
    },
    {
      message: 'Todos os campos de senha são obrigatórios quando você deseja alterar a senha',
      path: ['currentPassword'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0) {
        return sysConstants.regex.PASSWORD_STRONG_REGEX.test(data.newPassword);
      }

      return true;
    },
    {
      message:
        'Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&)',
      path: ['newPassword'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    },
  );
