import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { SubmissionStatus } from "@prisma/client";

type OmittedProps = Omit<SelectProps, "children">;

type Props = OmittedProps & {
  selectedKeys?: Set<SubmissionStatus> | undefined;
  onSelectionChange: (value: Set<SubmissionStatus>) => void;
  excludedStatuses?: SubmissionStatus[];
};

const allStatuses = [
  SubmissionStatus.NEW,
  SubmissionStatus.DECLINED,
  SubmissionStatus.PROCESSED,
];

const text: Record<SubmissionStatus, string> = {
  DECLINED: "Declined",
  NEW: "New",
  PROCESSED: "Processed",
};

export const SubmissionStatusSelect = (props: Props) => {
  const { excludedStatuses = [], ...rest } = props;

  const statusesForRender = allStatuses.filter(
    (s) => !excludedStatuses.includes(s)
  );

  return (
    <Select {...rest}>
      {statusesForRender.map((status) => (
        <SelectItem key={status}>{text[status]}</SelectItem>
      ))}
    </Select>
  );
};
