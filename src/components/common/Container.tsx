import React from 'react';
import { BaseComponentProps } from '../../types';
import { cn } from '../../utils/cn';

export const Container: React.FC<BaseComponentProps> = ({ className, children }) => {
  return (
    <div className={cn('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};
