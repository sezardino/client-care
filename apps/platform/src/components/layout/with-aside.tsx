"use client";

import { Button, cn } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";
import { Typography } from "../ui/typography";

type Props = ComponentPropsWithoutRef<"div"> & {
  title: string;
  links: { name: string; href: string }[];
};

export const LayoutWithAside = (props: Props) => {
  const { title, links, className, children, ...rest } = props;
  const pathname = usePathname();

  return (
    <div
      {...rest}
      className={cn("w-full flex flex-col gap-5 md:flex-row", className)}
    >
      <aside className="md:w-1/3 lg:w-1/4 md:block max-md:border-b md:border-r border-indigo-100">
        <div className="sticky flex flex-col gap-6 py-4 md:p-4 text-sm top-12">
          <Typography level="h2" styling="h4" weight="medium">
            {title}
          </Typography>
          <nav>
            <ul className="grid grid-cols-1 gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Button
                    variant={link.href === pathname ? undefined : "light"}
                    size="sm"
                    href={link.href}
                  >
                    {link.name}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      <div className="w-full md:pt-10">{children}</div>
    </div>
  );
};
