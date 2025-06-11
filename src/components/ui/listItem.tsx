import Link from 'next/link';
import { ReactNode } from 'react';

export interface IPropsListItem {
  title: string;
  children?: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export const ListItem = ({
  title,
  children,
  href,
  onClick,
  className,
}: IPropsListItem) => {
  const mainComponent = () => (
    <div
      className={`hover:bg-accent p-3 rounded-md transition-colors cursor-pointer h-full ${className}`}
    >
      <div className="text-md font-medium">{title}</div>
      <div className="text-sm leading-tight text-muted-foreground">
        {children}
      </div>
    </div>
  );

  if (href)
    return (
      <Link href={href} onClick={onClick}>
        {mainComponent()}
      </Link>
    );
  return mainComponent();
};
