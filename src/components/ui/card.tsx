import { FC, HTMLAttributes, ReactNode } from 'react';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const BaseCard: FC<IProps> = ({ children, className, ...props }) => {
  return (
    <div className={`rounded-md ${className}`} {...props}>
      {children}
    </div>
  );
};
