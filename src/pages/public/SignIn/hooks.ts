import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { formSchema } from './schemas';
import React from 'react';

export function useSignInCore() {
  const [isVisibility, setIsVisibility] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
