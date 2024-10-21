import { Card, CardProps, cn } from "@nextui-org/react";

type AlertColors =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

type Props = CardProps & {
  color?: AlertColors;
};

const colors: Record<AlertColors, string> = {
  danger: "bg-danger-50 border-l-4 border-danger-500 text-danger-700",
  default: "bg-default-50 border-l-4 border-default-500 text-default-700",
  primary: "bg-primary-50 border-l-4 border-primary-500 text-primary-700",
  secondary:
    "bg-secondary-50 border-l-4 border-secondary-500 text-secondary-700",
  success: "bg-success-50 border-l-4 border-success-500 text-success-700",
  warning: "bg-warning-50 border-l-4 border-warning-500 text-warning-700",
};

export const Alert = (props: Props) => {
  const { color = "default", className, ...rest } = props;

  return (
    <Card
      {...rest}
      className={cn("border-l-4", colors[color], className)}
    ></Card>
  );
};
