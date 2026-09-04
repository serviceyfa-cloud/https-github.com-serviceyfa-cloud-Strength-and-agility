import React, { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  error?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      helpText,
      error,
      startElement,
      endElement,
      disabled = false,
      required = false,
      className,
      wrapperClassName,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helpId = helpText ? `${inputId}-help` : undefined;
    const describedBy = error ? errorId : helpId;

    const hasError = Boolean(error);

    return (
      <div className={cn('w-full flex flex-col gap-1.5 text-start', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-xs sm:text-sm font-medium text-[#161A18] select-none flex items-center gap-1',
              disabled && 'opacity-60 cursor-not-allowed'
            )}
          >
            <span>{label}</span>
            {required && (
              <span className="text-[#9A7B38] text-xs leading-none" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {startElement && (
            <div className="absolute start-3.5 flex items-center justify-center pointer-events-none text-[#4B534E] shrink-0">
              {startElement}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            className={cn(
              'w-full min-h-[48px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-[#161A18]',
              'bg-[#FFFFFF] border transition-colors duration-150 ease-in-out',
              'placeholder:text-[#4B534E]/60',
              'focus:outline-none',
              startElement && 'ps-10',
              endElement && 'pe-10',
              // Normal State
              !hasError &&
                !disabled &&
                'border-[#E5E1DA] hover:border-[#D1CCC3] focus:border-[#1A4736] focus:ring-1 focus:ring-[#1A4736]',
              // Error State
              hasError &&
                !disabled &&
                'border-[#B93834] focus:border-[#B93834] focus:ring-1 focus:ring-[#B93834]',
              // Disabled State
              disabled &&
                'bg-[#FAF8F5] text-[#4B534E]/60 border-[#E5E1DA] opacity-60 cursor-not-allowed select-none',
              className
            )}
            {...props}
          />

          {endElement && (
            <div className="absolute end-3.5 flex items-center justify-center pointer-events-none text-[#4B534E] shrink-0">
              {endElement}
            </div>
          )}
        </div>

        {hasError ? (
          <p
            id={errorId}
            role="alert"
            className="text-[11px] sm:text-xs text-[#B93834] font-medium leading-tight"
          >
            {error}
          </p>
        ) : helpText ? (
          <p
            id={helpId}
            className="text-[11px] sm:text-xs text-[#4B534E] font-normal leading-tight"
          >
            {helpText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
