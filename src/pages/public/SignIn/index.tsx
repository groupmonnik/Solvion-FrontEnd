import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React from 'react';
import { useSignInCore } from './hooks';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  const { form, isVisibility, onSubmit, handleMouseDown, handleMouseUp } = useSignInCore();
  return (
    <main
      data-role='signin-page-container'
      className='flex h-full w-full items-center justify-center p-12 px-6'
    >
      <div
        data-role='signin-content-wrapper'
        className='flex w-full max-w-[43rem] flex-col items-center gap-12'
      >
        <h1
          data-role='signin-page-title'
          className='text-5xl select-none'
        >
          Bem-vindo(a) de <br />
          volta ao <b>Solvion</b>
        </h1>
        <div
          data-role='signin-form-container'
          className='border-[#00FF901A flex w-full flex-col rounded-3xl border bg-[#C8C8C82E] px-6 py-16 backdrop-blur-md sm:px-20 md:px-28'
        >
          <Form {...form}>
            <form
              data-role='signin-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col space-y-8'
            >
              <FormField
                control={form.control}
                name='login'
                render={({ field }) => (
                  <FormItem data-role='signin-login-field'>
                    <FormLabel data-role='signin-login-label'>Login</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        data-role='signin-login-input'
                        placeholder='E-mail'
                        autoScroll
                      />
                    </FormControl>
                    <FormMessage data-role='signin-login-error' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem data-role='signin-password-field'>
                    <FormLabel data-role='signin-password-label'>Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        data-role='signin-password-input'
                        placeholder='Senha'
                        append={React.createElement(
                          isVisibility ? VisibilityIcon : VisibilityOffIcon,
                          {
                            onMouseDown: handleMouseDown,
                            onMouseUp: handleMouseUp,
                            onMouseLeave: handleMouseUp,
                            onTouchStart: handleMouseDown,
                            onTouchEnd: handleMouseUp,
                            onMouseMove: handleMouseUp,
                            className:
                              'cursor-pointer text-ud-middle-gray hover:text-ud-black transition-colors duration-300',
                          },
                        )}
                        type={isVisibility ? 'text' : 'password'}
                        autoScroll
                      />
                    </FormControl>

                    <div
                      data-role='signin-password-footer'
                      className='flex flex-nowrap gap-4'
                    >
                      <FormMessage data-role='signin-password-error' />

                      <a
                        data-role='signin-forgot-password-link'
                        className='hover:text-ud-black text-ud-middle-gray ml-auto flex cursor-pointer whitespace-nowrap underline transition-colors duration-300'
                      >
                        Esqueci a senha
                      </a>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                data-role='signin-submit-button'
                type='submit'
              >
                ENTRAR
              </Button>
            </form>
          </Form>

          <div
            data-role='signin-divider'
            className='text-ud-middle-gray mt-10 mb-6 flex flex-nowrap items-center gap-4.5 text-2xl font-light select-none'
          >
            <div
              data-role='signin-divider-line-left'
              className='bg-ud-middle-gray h-px flex-1'
            />
            ou
            <div
              data-role='signin-divider-line-right'
              className='bg-ud-middle-gray h-px flex-1'
            />
          </div>

          <Link
            data-role='signin-create-account-link'
            to={'/sign-up'}
            className='text-ud-middle-gray hover:text-ud-black mx-auto cursor-pointer text-2xl font-light underline transition-colors duration-300 select-none'
          >
            Criar conta
          </Link>
        </div>
      </div>
    </main>
  );
}
