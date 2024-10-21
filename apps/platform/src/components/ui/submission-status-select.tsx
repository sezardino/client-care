import {
  Select,
  SelectItem,
  SelectProps,
  SharedSelection,
} from "@nextui-org/react";
import { SubmissionStatus } from "@prisma/client";

type OmittedProps = Omit<SelectProps, "children" | "onSelectionChange">;

type Props = OmittedProps & {
  selectedKeys?: Set<SubmissionStatus> | undefined;
  onSelectionChange: (value: SubmissionStatus[]) => void;
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
  const { excludedStatuses = [], onSelectionChange, ...rest } = props;

  const statusesForRender = allStatuses.filter(
    (s) => !excludedStatuses.includes(s)
  );

  const changeHandler = (selection: SharedSelection) => {
    if (selection === "all") return allStatuses;

    const statuses = Array.from(selection) as SubmissionStatus[];

    onSelectionChange(statuses);
  };

  return (
    <Select {...rest} onSelectionChange={changeHandler}>
      {statusesForRender.map((status) => (
        <SelectItem key={status}>{text[status]}</SelectItem>
      ))}
    </Select>
  );
};
