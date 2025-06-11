import { IOptions } from '@/interface/config/option';
import { ChangeEventHandler, SelectHTMLAttributes } from 'react';
import { Icon } from './icons';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  option: IOptions[];
  name: string;
  placeholder?: string;
}

export const ComboBox = ({
  label,
  option,
  className,
  onChange,
  placeholder,
  name,
  ...props
}: IProps) => {
  return (
    <div
      className={`relative form-select flex h-10 w-full rounded-md border-2 md:border border-input text-base ring-offset-background items-center ${className}`}
    >
      <label htmlFor={props.id}>{label}</label>
      <label htmlFor={props.id} className="absolute right-3">
        <Icon name="sliders-horizontal" size={18} strokeWidth={1} />
      </label>
      <select
        name={name}
        {...props}
        onChange={onChange}
        className="rounded-md bg-background px-3 py-2 w-full placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm line-clamp-1"
      >
        <option value="" disabled hidden>
          {placeholder ? placeholder : 'Filter'}
        </option>
        {option.map((item, i) => (
          <option value={item.value} key={i}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
