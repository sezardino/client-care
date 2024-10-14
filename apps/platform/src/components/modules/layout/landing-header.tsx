"use client";

import { ProjectUrls } from "@/const/url";
import { CurrentUserData } from "@/types/user";
import { Button, cn } from "@nextui-org/react";
import { Handshake } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";
import { HamburgerButton } from "./hamburger-button";
import { UserDropdown } from "./user-dropdown";

const MOBILE_MENU_ID = "mobile-menu";

type LandingHeaderProps = ComponentPropsWithoutRef<"header"> & {
  user: CurrentUserData | null;
};

export const LandingHeader = (props: LandingHeaderProps) => {
  const { user, className, ...rest } = props;
  const pathname = usePathname();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const landingNavigationLinks = [
    { label: "Home", href: ProjectUrls.home },
    { label: "Road Map", href: ProjectUrls.roadMap },
    ...(user ? [{ label: "Dashboard", href: ProjectUrls.dashboard }] : []),
  ];

  return (
    <header
      {...rest}
      className={cn(
        "border-gray-200 px-4 lg:px-6 py-2.5 bg-muted/40 relative",
        isMenuOpened && "bg-default-100",
        className
      )}
    >
      <nav>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href={ProjectUrls.home} className="flex items-center">
            <Handshake className="mr-3 h-6 sm:h-9" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Client-care
            </span>
          </Link>
          <div className="flex items-center lg:order-2 gap-1">
            {!user && (
              <>
                <Button as={Link} href={ProjectUrls.login} variant="light">
                  Log in
                </Button>

                <Button
                  as={Link}
                  href={ProjectUrls.registration}
                  variant="light"
                >
                  Get started
                </Button>
              </>
            )}

            {user && <UserDropdown user={user} />}

            <HamburgerButton
              isActive={isMenuOpened}
              size={"sm"}
              variant={"ghost"}
              data-collapse-toggle={MOBILE_MENU_ID}
              type="button"
              className="ml-1 lg:hidden"
              onClick={() => setIsMenuOpened((prev) => !prev)}
              aria-controls={MOBILE_MENU_ID}
              aria-expanded={isMenuOpened}
            >
              <span className="sr-only">
                {isMenuOpened ? "Close" : "Open"} main menu
              </span>
            </HamburgerButton>
          </div>
          <div
            className={cn(
              "justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ",
              !isMenuOpened && "hidden",
              isMenuOpened && "bg-default-100 absolute top-full left-0 right-0"
            )}
            id={MOBILE_MENU_ID}
          >
            <ul className="flex flex-col mt-4 gap-1 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {landingNavigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 pr-4 pl-3 hover:underline lg:bg-transparent lg:text-primary-700 lg:p-0"
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
