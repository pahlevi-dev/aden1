'use client';
import { IPropsMenuComponent } from '@/components/layouts/header/menu.types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ListItem } from '@/components/ui/listItem';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const MobileMenu = ({ data }: IPropsMenuComponent) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>Menu</SheetTitle>
          <div className="grid gap-2">
            {data.map((item, i) => {
              if (item.active === false) return null;

              return (
                <div key={i}>
                  {item.child?.length ? (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      onClick={() => setOpen(true)}
                    >
                      <AccordionItem value={`item-${i}`}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>
                          {item.child.map((el, idx) => (
                            <SheetTrigger key={idx} asChild>
                              <ListItem
                                className="text-sm"
                                title={el.title}
                                href={el.href}
                              />
                            </SheetTrigger>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <SheetTrigger asChild>
                      <ListItem
                        className="px-0 text-sm"
                        title={item.title}
                        href={item.href}
                      />
                    </SheetTrigger>
                  )}
                </div>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
