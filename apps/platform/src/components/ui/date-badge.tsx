import { DEFAULT_DATE_FORMAT } from "@/const/base";
import { Chip, ChipProps } from "@nextui-org/react";
import dayjs from "dayjs";
import { CalendarClock } from "lucide-react";

type Props = Omit<ChipProps, "children" | "variant"> & {
  date: Date;
};

export const DateBadge = (props: Props) => {
  const { date, size = "sm" } = props;

  return (
    <Chip
      size={size}
      variant="faded"
      startContent={<CalendarClock className="w-3.5 h-3.4" />}
    >
      {dayjs(date).format(DEFAULT_DATE_FORMAT)}
    </Chip>
  );
};
