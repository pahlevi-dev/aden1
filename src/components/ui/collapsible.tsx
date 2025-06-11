'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface IProps {
  title: string;
  description: string;
  defaultOpen?: boolean;
}

export const Collapsible = ({
  title,
  description,
  defaultOpen = false,
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const toggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`border transition-all border-[#C3C3C3] p-5 rounded-md cursor-pointer ${
        isOpen ? 'bg-white space-y-2 ' : 'bg-transparent'
      }`}
      onClick={toggleClick}
    >
      <div className="grid grid-cols-12">
        <div className="text-lg font-bold col-span-11">{title}</div>
        <div className="flex justify-end md:items-center">
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </div>
      </div>
      <div
        className={`overflow-hidden ease-out transition-all ${
          isOpen ? 'h-auto' : 'h-0'
        }`}
      >
        <p className="text-md mt-3">{description}</p>
      </div>
    </div>
  );
};
