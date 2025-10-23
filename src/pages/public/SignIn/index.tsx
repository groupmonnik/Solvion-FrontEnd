import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSignInCore } from './hooks';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  const { form, isVisibility, onSubmit, handleMouseDown, handleMouseUp } = useSignInCore();

  return (
    <main
      data-role='signin-page-container'
      className='flex h-full min-h-dvh w-full items-center justify-center p-12 px-6'
    >
      <div
        data-role='signin-content-wrapper'
        className='relative flex w-full max-w-[79.625rem] flex-col-reverse items-stretch rounded-[3rem] bg-[#FFFEFE9C] lg:min-h-[36.9rem] lg:flex-row xl:min-h-[43.125rem]'
      >
        <section className='z-[2] flex w-full flex-col items-center justify-center rounded-[3rem] bg-[#68C8AE] px-10 py-14 lg:w-1/2 lg:px-16 lg:py-16'>
          <h1 className='text-center text-5xl leading-normal font-bold text-white'>
            Bem-vindo(a) <br /> de volta
          </h1>
          <h2 className='mt-4 text-center text-2xl leading-normal font-bold text-white'>
            Ainda não tem uma conta?
            <br className='flex sm:hidden' /> Registre-se <br className='hidden sm:flex' /> para
            começar
          </h2>
          <Link to='/sign-up'>
            <Button
              variant='outline'
              className='mt-20'
              size='md'
            >
              Registrar
            </Button>
          </Link>
        </section>

        <div className='z-[1] flex w-full flex-col rounded-r-[3rem] px-10 pt-0 pb-14 lg:w-1/2 lg:px-16 lg:pt-16 lg:pb-16'>
          <div className='flex h-full flex-col items-center justify-center'>
            <section className='flex w-full max-w-full flex-col items-center lg:max-w-[24rem]'>
              <h1 className='text-4xl leading-normal font-bold text-black'>Entrar</h1>
              <h2 className='mt-2 text-xl leading-normal font-bold text-black/60'>
                Use seu email e senha para entrar
              </h2>

              <Form {...form}>
                <form
                  data-role='signin-form'
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='mt-8 flex w-full flex-col gap-6'
                >
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            data-role='email-input'
                            placeholder='E-mail'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              data-role='password-input'
                              type={isVisibility ? 'text' : 'password'}
                              placeholder='Senha'
                              {...field}
                            />
                            <button
                              type='button'
                              onMouseDown={handleMouseDown}
                              onMouseUp={handleMouseUp}
                              className='absolute top-1/2 right-3 -translate-y-1/2'
                            >
                              {isVisibility ? (
                                <VisibilityOffIcon className='text-black/50' />
                              ) : (
                                <VisibilityIcon className='text-black/50' />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </FormItem>
                    )}
                  />
                  <Button
                    data-role='submit-button'
                    type='submit'
                    variant='default'
                    size='md'
                    className='text-ud-white mt-4 w-full bg-[#68C8AE] hover:bg-[#68C8AE]/90'
                  >
                    Entrar
                  </Button>
                </form>
              </Form>

              <Link
                to='/forgot-password'
                className='mt-14 text-lg font-normal text-[#1E1E1E] hover:underline'
              >
                Esqueceu a senha?
              </Link>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
