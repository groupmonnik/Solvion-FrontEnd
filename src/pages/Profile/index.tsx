import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfileCore } from './hooks';
import sysUtils from '@/utils';

export default function ProfilePage() {
  const { form, onSubmit } = useProfileCore();

  return (
    <main
      data-role='profile-page-container'
      className='flex h-full min-h-dvh w-full items-center justify-center p-6'
    >
      <div
        data-role='profile-content-wrapper'
        className='flex w-full max-w-[37.5rem] flex-col rounded-3xl px-10 py-14'
      >
        <h1 className='text-[2rem] leading-normal font-semibold text-black'>Perfil</h1>

        <div className='mt-4 rounded-2xl bg-[#2E9E2433] px-8 py-8'>
          <h2 className='text-[1.125rem] leading-normal font-bold text-black'>
            Informações Pessoais
          </h2>

          <Form {...form}>
            <form
              data-role='profile-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='mt-6 flex w-full flex-col gap-4'
            >
              <div className='flex flex-col gap-4 sm:flex-row'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem
                      data-role='profile-name-field'
                      className='flex-1'
                    >
                      <FormControl>
                        <Input
                          {...field}
                          data-role='profile-name-input'
                          placeholder='Nome'
                          autoScroll
                        />
                      </FormControl>
                      <FormMessage data-role='profile-name-error' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem
                      data-role='profile-lastname-field'
                      className='flex-1'
                    >
                      <FormControl>
                        <Input
                          {...field}
                          data-role='profile-lastname-input'
                          placeholder='Sobrenome'
                          autoScroll
                        />
                      </FormControl>
                      <FormMessage data-role='profile-lastname-error' />
                    </FormItem>
                  )}
                />
              </div>

              <div
                data-role='profile-cpf-fields-wrapper'
                className='flex gap-4'
              >
                <FormField
                  control={form.control}
                  name='cpf'
                  render={({ field }) => (
                    <FormItem
                      data-role='profile-cpf-field'
                      className='flex-1'
                    >
                      <FormControl>
                        <Input
                          {...field}
                          data-role='profile-cpf-input'
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
                      <FormMessage data-role='profile-cpf-error' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='isForeigner'
                  render={({ field }) => (
                    <FormItem
                      data-role='profile-foreigner-field'
                      className='mt-4.5 w-fit sm:w-auto sm:flex-1'
                    >
                      <div className='flex h-fit items-center gap-2'>
                        <input
                          type='checkbox'
                          id='isForeigner'
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className='h-4 w-4 cursor-pointer'
                        />
                        <Label
                          htmlFor='isForeigner'
                          className='cursor-pointer text-sm font-normal'
                        >
                          Sou Estrangeiro
                        </Label>
                      </div>
                      <FormMessage data-role='profile-foreigner-error' />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem data-role='profile-phone-field'>
                    <FormControl>
                      <Input
                        {...field}
                        data-role='profile-phone-input'
                        placeholder='Telefone'
                        autoScroll
                        onChange={(e) => {
                          const formattedValue = sysUtils.mask.phone({
                            value: e.target.value,
                          });
                          field.onChange(formattedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage data-role='profile-phone-error' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem data-role='profile-email-field'>
                    <FormControl>
                      <Input
                        {...field}
                        data-role='profile-email-input'
                        placeholder='E-mail'
                        autoScroll
                      />
                    </FormControl>
                    <FormMessage data-role='profile-email-error' />
                  </FormItem>
                )}
              />

              <div className='mt-4'>
                <h3 className='text-[1.125rem] leading-normal font-bold text-black'>
                  Informações de Endereço
                </h3>

                <div className='mt-4 flex flex-col gap-4 sm:flex-row'>
                  <FormField
                    control={form.control}
                    name='cep'
                    render={({ field }) => (
                      <FormItem
                        data-role='profile-cep-field'
                        className='flex-1'
                      >
                        <FormControl>
                          <Input
                            {...field}
                            data-role='profile-cep-input'
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
                        <FormMessage data-role='profile-cep-error' />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem
                        data-role='profile-address-field'
                        className='flex-1'
                      >
                        <FormControl>
                          <Input
                            {...field}
                            data-role='profile-address-input'
                            placeholder='Endereço'
                            autoScroll
                          />
                        </FormControl>
                        <FormMessage data-role='profile-address-error' />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='mt-4'>
                <h3 className='text-[1.125rem] leading-normal font-bold text-black'>
                  Alterar Senha
                </h3>

                <div className='mt-4 flex flex-col gap-4'>
                  <FormField
                    control={form.control}
                    name='currentPassword'
                    render={({ field }) => (
                      <FormItem data-role='profile-current-password-field'>
                        <FormControl>
                          <Input
                            {...field}
                            data-role='profile-current-password-input'
                            type='password'
                            placeholder='Senha atual'
                            autoScroll
                          />
                        </FormControl>
                        <FormMessage data-role='profile-current-password-error' />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='newPassword'
                    render={({ field }) => (
                      <FormItem data-role='profile-new-password-field'>
                        <FormControl>
                          <Input
                            {...field}
                            data-role='profile-new-password-input'
                            type='password'
                            placeholder='Nova senha'
                            autoScroll
                          />
                        </FormControl>
                        <FormMessage data-role='profile-new-password-error' />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem data-role='profile-confirm-password-field'>
                        <FormControl>
                          <Input
                            {...field}
                            data-role='profile-confirm-password-input'
                            type='password'
                            placeholder='Repetir senha'
                            autoScroll
                          />
                        </FormControl>
                        <FormMessage data-role='profile-confirm-password-error' />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                data-role='profile-submit-button'
                type='submit'
                variant='default'
                size='md'
                className='text-ud-white mt-6 w-full bg-[#2E9E24] hover:bg-[#2E9E24]/90'
              >
                ATUALIZAR
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
