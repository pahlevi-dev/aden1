import { FC, HTMLAttributes, ReactNode } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Chips: FC<IProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={`transition-all rounded-md text-sm px-6 py-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
