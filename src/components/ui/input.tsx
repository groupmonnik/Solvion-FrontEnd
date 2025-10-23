import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.ComponentProps<'input'> {
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  root?: React.ComponentProps<'div'>;
  autoScroll?: boolean;
}

function Input({
  className,
  type,
  prepend,
  append,
  root,
  autoScroll = true,
  onFocus,
  ...props
}: InputProps) {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e);

    if (!e.defaultPrevented && autoScroll) {
      e.target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  return (
    <div
      {...root}
      className={cn('relative flex h-fit items-center', root?.className)}
    >
      {prepend && (
        <div className='text-muted-foreground absolute left-3 flex items-center select-none'>
          {prepend}
        </div>
      )}
      <input
        type={type}
        data-slot='input'
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-3xl border bg-white px-3 py-4 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          prepend && 'pl-10',
          append && 'pr-10',
          className,
        )}
        onFocus={handleFocus}
        {...props}
      />
      {append && (
        <div className='text-muted-foreground absolute right-3 z-[1] flex items-center select-none'>
          {append}
        </div>
      )}
    </div>
  );
}

export { Input };
