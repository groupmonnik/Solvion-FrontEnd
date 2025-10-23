import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignUpCore } from './hooks';
import sysUtils from '@/utils';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  const { form, onSubmit, isVisibility, handleMouseDown, handleMouseUp } = useSignUpCore();
  return (
    <main
      data-role='signup-page-container'
      className='flex h-full min-h-dvh w-full items-center justify-center p-6'
    >
      <div
        data-role='signup-content-wrapper'
        className='relative flex w-full max-w-[79.625rem] flex-col-reverse items-stretch rounded-[3rem] bg-[#FFFEFE9C] lg:min-h-[36.9rem] lg:flex-row xl:min-h-[43.125rem]'
      >
        <section className='z-[2] flex w-full flex-col items-center justify-center rounded-[3rem] bg-[#68C8AE] px-8 py-14 sm:px-10 lg:w-1/2 lg:px-16 lg:py-16'>
          <h1 className='text-center text-5xl leading-normal font-bold text-white'>
            Bem-vindo(a) <br /> ao Solvion
          </h1>
          <h2 className='mt-4 text-center text-xl leading-normal font-bold text-white sm:text-2xl lg:text-xl xl:text-2xl'>
            Para se manter conectado conosco <br /> faça login com suas informações pessoais
          </h2>
          <Link to='/sign-in'>
            <Button
              variant='outline'
              className='mt-20'
              size='md'
            >
              Entrar
            </Button>
          </Link>
        </section>

        <div className='z-[1] flex w-full flex-col rounded-r-[3rem] px-10 pt-0 pb-14 lg:w-1/2 lg:px-16 lg:pt-10 lg:pb-10'>
          <div className='flex h-full flex-col items-center justify-center'>
            <section className='flex w-full max-w-full flex-col items-center lg:max-w-[24rem]'>
              <h1 className='text-4xl leading-normal font-bold text-black'>Registrar</h1>
              <h2 className='mt-2 text-xl leading-normal font-bold text-black/60'>
                Crie sua conta para começar
              </h2>

              <Form {...form}>
                <form
                  data-role='signup-form'
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='mt-8 flex w-full flex-col gap-4'
                >
                  <div
                    data-role='signup-name-fields-wrapper'
                    className='flex flex-col gap-4 sm:flex-row'
                  >
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem
                          data-role='signup-name-field'
                          className='flex-1'
                        >
                          <FormControl>
                            <Input
                              {...field}
                              data-role='signup-name-input'
                              placeholder='Nome'
                              className='mt-auto'
                              autoScroll
                            />
                          </FormControl>
                          <FormMessage data-role='signup-name-error' />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='lastName'
                      render={({ field }) => (
                        <FormItem
                          data-role='signup-lastname-field'
                          className='flex-1'
                        >
                          <FormControl>
                            <Input
                              {...field}
                              data-role='signup-lastname-input'
                              placeholder='Sobrenome'
                              autoScroll
                            />
                          </FormControl>
                          <FormMessage data-role='signup-lastname-error' />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div
                    data-role='signup-cpf-fields-wrapper'
                    className='flex gap-4'
                  >
                    <FormField
                      control={form.control}
                      name='cpf'
                      render={({ field }) => (
                        <FormItem
                          data-role='signup-cpf-field'
                          className='flex-1'
                        >
                          <FormControl>
                            <Input
                              {...field}
                              data-role='signup-cpf-input'
                              placeholder='CPF'
                              autoScroll
                              onChange={(e) => {
                                const formattedValue = sysUtils.mask.number({
                                  value: e.target.value,
                                  mask: '###.###.###-##',
                                });

                                field.onChange(formattedValue);
                              }}
                            />
                          </FormControl>
                          <FormMessage data-role='signup-cpf-error' />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='isForeigner'
                      render={({ field }) => (
                        <FormItem
                          data-role='signup-foreigner-field'
                          className='w-fit sm:w-auto sm:flex-1'
                        >
                          <div className='mt-4.5 flex h-fit items-center gap-2'>
                            <input
                              type='checkbox'
                              id='isForeigner'
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className='h-4 w-4 cursor-pointer'
                            />
                            <Label
                              htmlFor='isForeigner'
                              className='h-fit cursor-pointer items-start text-sm font-normal'
                            >
                              Sou Estrangeiro
                            </Label>
                          </div>
                          <FormMessage data-role='signup-foreigner-error' />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem data-role='signup-email-field'>
                        <FormControl>
                          <Input
                            {...field}
                            data-role='signup-email-input'
                            placeholder='E-mail'
                            autoScroll
                          />
                        </FormControl>
                        <FormMessage data-role='signup-email-error' />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem data-role='signup-password-field'>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              data-role='signup-password-input'
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
                        <FormMessage data-role='signup-password-error' />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='passwordConfirm'
                    render={({ field }) => (
                      <FormItem data-role='signup-passwordconfirm-field'>
                        <FormControl>
                          <Input
                            {...field}
                            data-role='signup-passwordconfirm-input'
                            type='password'
                            placeholder='Confirmar Senha'
                            autoScroll
                          />
                        </FormControl>
                        <FormMessage data-role='signup-passwordconfirm-error' />
                      </FormItem>
                    )}
                  />

                  <div
                    data-role='signup-address-fields-wrapper'
                    className='flex flex-col gap-4 sm:flex-row'
                  >
                    <FormField
                      control={form.control}
                      name='cep'
                      render={({ field }) => (
                        <FormItem
                          data-role='signup-cep-field'
                          className='flex-1'
                        >
                          <FormControl>
                            <Input
                              {...field}
                              data-role='signup-cep-input'
                              placeholder='CEP'
                              className='mt-auto'
                              autoScroll
                              onChange={(e) => {
                                const formattedValue = sysUtils.mask.number({
                                  value: e.target.value,
                                  mask: '#####-###',
                                });

                                field.onChange(formattedValue);
                              }}
                            />
                          </FormControl>
                          <FormMessage data-role='signup-cep-error' />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='address'
                      render={({ field }) => (
                        <FormItem
                          data-role='signup-address-field'
                          className='flex-1'
                        >
                          <FormControl>
                            <Input
                              {...field}
                              data-role='signup-address-input'
                              placeholder='Endereço'
                              autoScroll
                            />
                          </FormControl>
                          <FormMessage data-role='signup-address-error' />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    data-role='signup-submit-button'
                    type='submit'
                    variant='default'
                    size='md'
                    className='text-ud-white mt-4 w-full bg-[#68C8AE] hover:bg-[#68C8AE]/90'
                  >
                    Registrar
                  </Button>
                </form>
              </Form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
