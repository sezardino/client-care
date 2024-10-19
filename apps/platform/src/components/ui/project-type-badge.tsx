import { Chip, ChipProps } from "@nextui-org/react";
import { WidgetType } from "@prisma/client";

type Props = Omit<ChipProps, "children" | "color" | "variant"> & {
  type: WidgetType;
};

const text: Record<WidgetType, string> = {
  CONTACT: "Contact",
  FEEDBACK: "Feedback",
  REPORT: "Report",
  SURVEY: "Survey",
};

const colors: Record<WidgetType, ChipProps["color"]> = {
  CONTACT: "warning",
  FEEDBACK: "default",
  REPORT: "primary",
  SURVEY: "secondary",
};

export const WidgetTypeBadge = (props: Props) => {
  const { type, size = "sm", ...rest } = props;

  return (
    <Chip {...rest} size={size} variant="flat" color={colors[type]}>
      {text[type]}
    </Chip>
  );
};
