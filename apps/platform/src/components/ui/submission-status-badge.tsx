import { Chip, ChipProps } from "@nextui-org/react";
import { SubmissionStatus } from "@prisma/client";

type Props = Omit<ChipProps, "children" | "color"> & {
  status: SubmissionStatus;
};

const text: Record<SubmissionStatus, string> = {
  DECLINED: "Declined",
  NEW: "New",
  PROCESSED: "Processed",
};

const colors: Record<SubmissionStatus, ChipProps["color"]> = {
  DECLINED: "danger",
  NEW: "default",
  PROCESSED: "warning",
};

export const SubmissionStatusBadge = (props: Props) => {
  const { status, size = "sm", ...rest } = props;

  return (
    <Chip {...rest} size={size} variant="faded" color={colors[status]}>
      {text[status]}
    </Chip>
  );
};
