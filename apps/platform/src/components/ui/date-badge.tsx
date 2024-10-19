import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_FORMAT_WITH_TIME,
} from "@/const/base";
import { Chip, ChipProps } from "@nextui-org/react";
import dayjs from "dayjs";
import { CalendarClock } from "lucide-react";

type Props = Omit<ChipProps, "children" | "variant"> & {
  date: Date;
  isTimeIncluded?: boolean;
};

export const DateBadge = (props: Props) => {
  const { date, isTimeIncluded, size = "sm" } = props;

  return (
    <Chip
      size={size}
      variant="faded"
      startContent={<CalendarClock className="w-3.5 h-3.4" />}
    >
      {dayjs(date).format(
        isTimeIncluded ? DEFAULT_DATE_FORMAT_WITH_TIME : DEFAULT_DATE_FORMAT
      )}
    </Chip>
  );
};
