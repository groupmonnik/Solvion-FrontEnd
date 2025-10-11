import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { formSchema } from './schemas';
import React from 'react';

export function useSignUpCore() {
  const [isVisibility, setIsVisibility] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName: '',
      cpf: '',
      isForeigner: false,
      email: '',
      password: '',
      passwordConfirm: '',
      cep: '',
      address: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    console.log(values);
  }

  const handleMouseDown = () => {
    setIsVisibility(true);
  };

  const handleMouseUp = () => {
    setIsVisibility(false);
  };

  return {
    form,
    onSubmit,
    isVisibility,
    handleMouseDown,
    handleMouseUp,
  };
}
