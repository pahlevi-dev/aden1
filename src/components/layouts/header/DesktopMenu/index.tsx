import {
  IMenuChildNavigation,
  IPropsMenuComponent,
} from '@/components/layouts/header/menu.types';
import { ListItem } from '@/components/ui/listItem';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { IParams } from '@/interface/config/params';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export const DesktopMenu = ({ data }: IPropsMenuComponent) => {
  const pathname = usePathname();
  const params = useParams<IParams>();

  const styleActive = (href: string) => {
    let active = false;

    if (href !== `/${params.locale}` && pathname.includes(href)) {
      active = true;
    }

    if (href === pathname) {
      active = true;
    }

    return active
      ? navigationMenuTriggerStyle({
          className: 'bg-primary text-white',
        })
      : navigationMenuTriggerStyle();
  };

  const styleActiveDropDown = (menu: IMenuChildNavigation[]) => {
    let active = false;

    const listMenu = menu.map((item) => item.href);

    if (listMenu.includes(pathname)) {
      active = true;
    }

    return active
      ? navigationMenuTriggerStyle({
          className: 'bg-primary text-white',
        })
      : navigationMenuTriggerStyle();
  };

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {data.map((item, index) => {
          if (!item.active) return null;

          return (
            <NavigationMenuItem key={index}>
              {item.href && !item.child?.length ? (
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={styleActive(item.href)}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              ) : (
                <>
                  <NavigationMenuTrigger
                    className={styleActiveDropDown(item.child!)}
                  >
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] justify-items-stretch">
                      {item.child?.map((child, i) => {
                        if (!child.active) return null;
                        return (
                          <ListItem
                            title={child.title}
                            href={child.href}
                            key={i}
                          >
                            {child.description}
                          </ListItem>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
