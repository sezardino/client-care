"use client";

import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const/url";
import { useApplicationLogout } from "@/hooks/use-logout";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cn,
  Tooltip,
} from "@nextui-org/react";

import { Slot } from "@radix-ui/react-slot";
import {
  Folder,
  Grid,
  Home,
  LogOut,
  LucideProps,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { BrandLogo } from "./brand-logo";

type ApplicationSidebarProps = { id?: string; className?: string };

type LinkInner = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

type SidebarLink = LinkInner;

const mainLinks: SidebarLink[] = [
  { label: "Dashboard", href: ProjectUrls.dashboard, icon: Grid },
  { label: "Projects", href: ProjectUrls.projects, icon: Folder },
  { label: "Users", href: ProjectUrls.users, icon: Users },
];

export const ApplicationSidebar = (props: ApplicationSidebarProps) => {
  const { id, className } = props;
  const { logout } = useApplicationLogout();
  const pathname = usePathname();

  const footerLinks = [
    { label: "Back to landing", href: ProjectUrls.home, icon: Home },
    { label: "Settings", href: ProjectUrls.settings, icon: Settings },
    { label: "Log Out", onClick: logout, icon: LogOut },
  ];

  return (
    <Card
      as="div"
      id={id}
      className={cn("h-screen px-0.5 flex flex-col", className)}
    >
      <CardHeader className="p-2 border-b">
        <BrandLogo href={ProjectUrls.dashboard} />
      </CardHeader>
      <CardBody className="p-2">
        <nav>
          <ul className="flex flex-col gap-1">
            {mainLinks.map((item, index) => (
              <li key={index}>
                <SidebarTrigger asChild isActive={pathname === item.href}>
                  <SidebarLink {...item} />
                </SidebarTrigger>
              </li>
            ))}
          </ul>
        </nav>
      </CardBody>
      <CardFooter className="p-2 mt-auto justify-center">
        <ul className="flex items-center gap-2">
          {footerLinks.map((link, index) => (
            <li key={`${index}-${link.href}`}>
              <Tooltip
                content={
                  <Typography level="span" styling="small">
                    {link.label}
                  </Typography>
                }
                aria-label={link.label}
              >
                <Button
                  as={link.href ? Link : undefined}
                  href={link.href ? link.href : undefined}
                  variant={"ghost"}
                  color={"secondary"}
                  isIconOnly
                  onClick={link.onClick}
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </Button>
              </Tooltip>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
};

type SidebarTriggerProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  isActive: boolean;
};

const SidebarTrigger = (props: SidebarTriggerProps) => {
  const { asChild, className, isActive, children, ...rest } = props;

  const Comp = asChild ? Slot : "button";

  return (
    <>
      <Comp
        {...rest}
        className={cn(
          "flex py-2 px-4 rounded-lg hover:bg-default-400",
          "whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive && "bg-default",
          className
        )}
      >
        {children}
      </Comp>
    </>
  );
};

type SidebarLinkProps = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const SidebarLink = ({
  label,
  href,
  icon: Icon,
  ...rest
}: SidebarLinkProps) => (
  <Link {...rest} href={href}>
    <Icon className="h-5 w-5 mr-1 inline" />
    <Typography level="span" styling="small">
      {label}
    </Typography>
  </Link>
);
