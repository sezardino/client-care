import { Typography } from "@/components/ui/typography";
import { BreadcrumbItem, Breadcrumbs, cn } from "@nextui-org/react";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  as?: "header" | "div";
  breadcrumbs: { label: string; href?: string }[];
};

export const PageHeader = (props: Props) => {
  const {
    as: As = "header",
    breadcrumbs,
    children,
    className,
    ...rest
  } = props;

  return (
    <As {...rest} className={cn("flex flex-col gap-2", className)}>
      {children}
      {!!breadcrumbs.length && (
        <Breadcrumbs className="-order-1">
          {breadcrumbs.map((b, index) => (
            <BreadcrumbItem key={index} href={b.href}>
              {b.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      )}
    </As>
  );
};

type PageHeaderDescriptionProps = ComponentPropsWithoutRef<"div"> & {
  as?: "header" | "div";
  title: string;
  description: string;
};

export const PageHeaderDescription = (props: PageHeaderDescriptionProps) => {
  const { as: As = "div", title, description, className, ...rest } = props;

  return (
    <As {...rest} className={cn("flex flex-col gap-1", className)}>
      <Typography level="h1" weight="medium" styling="h2">
        {title}
      </Typography>
      <Typography styling="small" isMuted>
        {description}
      </Typography>
    </As>
  );
};
