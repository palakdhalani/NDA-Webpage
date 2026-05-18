import React from 'react';
import { twMerge } from 'tailwind-merge';

const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-sm font-bold text-secondary ml-1">
          {label}
        </label>
      )}
      <input
        className={twMerge(
          'w-full h-12 px-4 bg-card border border-default rounded-2xl outline-none focus:ring-2 focus:ring-harvest-accent/50 focus:border-harvest-accent transition-all text-sm text-secondary placeholder:text-secondary',
          error && 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-rose-500 font-medium ml-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
