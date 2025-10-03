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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSignUpCore } from './hooks';
import sysUtils from '@/utils';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SignUpPage() {
  const { form, onSubmit, isVisibility, handleMouseDown, handleMouseUp } = useSignUpCore();
  return (
    <main
      data-role='signup-page-container'
      className='flex h-full w-full items-center justify-center p-12 px-6'
    >
      <div
        data-role='signup-content-wrapper'
        className='flex w-full max-w-[43rem] flex-col items-center gap-12'
      >
        <h1
          data-role='signup-page-title'
          className='text-center text-5xl select-none'
        >
          Bem-vindo(a) ao <br />
          <b>Solvion</b>
        </h1>
        <div
          data-role='signup-form-container'
          className='border-[#00FF901A flex w-full flex-col rounded-3xl border bg-[#C8C8C82E] px-6 py-16 backdrop-blur-md sm:px-20 md:px-28'
        >
          <Form {...form}>
            <form
              data-role='signup-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col space-y-8'
            >
              <RadioGroup
                data-role='signup-person-type-selector'
                defaultValue='comfortable'
                className='mx-auto flex gap-8'
              >
                <div
                  data-role='signup-radio-option-fisica'
                  className='flex items-center'
                >
                  <RadioGroupItem
                    data-role='signup-radio-fisica'
                    value='default'
                    id='r1'
                    className='cursor-pointer bg-white'
                  />
                  <Label
                    data-role='signup-label-fisica'
                    htmlFor='r1'
                    className='cursor-pointer pl-3'
                  >
                    Pessoa Física
                  </Label>
                </div>
                <div
                  data-role='signup-radio-option-juridica'
                  className='flex items-center'
                >
                  <RadioGroupItem
                    data-role='signup-radio-juridica'
                    value='comfortable'
                    id='r2'
                    className='cursor-pointer bg-white'
                  />
                  <Label
                    data-role='signup-label-juridica'
                    htmlFor='r2'
                    className='cursor-pointer pl-3'
                  >
                    Pessoa Jurídica
                  </Label>
                </div>
              </RadioGroup>
              <div
                data-role='signup-name-fields-wrapper'
                className='flex flex-col gap-2 sm:flex-row sm:gap-8'
              >
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem
                      data-role='signup-firstname-field'
                      className='flex-1'
                    >
                      <FormLabel data-role='signup-firstname-label'>Nome Completo *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          data-role='signup-firstname-input'
                          placeholder='Nome'
                          className='mt-auto'
                          autoScroll
                        />
                      </FormControl>
                      <FormMessage data-role='signup-firstname-error' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem
                      data-role='signup-lastname-field'
                      className='mt-auto flex-1'
                    >
                      <FormControl className='items-end'>
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

              <FormField
                control={form.control}
                name='cpf'
                render={({ field }) => (
                  <FormItem data-role='signup-cpf-field'>
                    <FormLabel data-role='signup-cpf-label'>CPF *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        data-role='signup-cpf-input'
                        placeholder='EX.: 123.456.789-10'
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
                name='telephone'
                render={({ field }) => (
                  <FormItem data-role='signup-telephone-field'>
                    <FormLabel data-role='signup-telephone-label'>Telefone *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        data-role='signup-telephone-input'
                        placeholder='EX.: (99) 99999-9999'
                        onChange={(e) => {
                          const formattedValue = sysUtils.mask.phone({ value: e.target.value });

                          field.onChange(formattedValue);
                        }}
                        autoScroll
                      />
                    </FormControl>
                    <FormMessage data-role='signup-telephone-error' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem data-role='signup-email-field'>
                    <FormLabel data-role='signup-email-label'>E-mail *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        data-role='signup-email-input'
                        placeholder='EX.: solvion@email.com'
                        autoScroll
                      />
                    </FormControl>
                    <FormMessage data-role='signup-email-error' />
                  </FormItem>
                )}
              />

              <div
                data-role='signup-password-fields-wrapper'
                className='flex flex-col gap-2'
              >
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem data-role='signup-password-field'>
                      <FormLabel data-role='signup-password-label'>Senha *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          data-role='signup-password-input'
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
                          placeholder='EX.: @Solvion1'
                          autoScroll
                        />
                      </FormControl>
                      <FormMessage data-role='signup-password-error' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='repassword'
                  render={({ field }) => (
                    <FormItem data-role='signup-repassword-field'>
                      <FormControl>
                        <Input
                          {...field}
                          data-role='signup-repassword-input'
                          type='password'
                          placeholder='Repetir a senha'
                          autoScroll
                        />
                      </FormControl>
                      <FormMessage data-role='signup-repassword-error' />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                data-role='signup-submit-button'
                type='submit'
              >
                REGISTRAR
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
