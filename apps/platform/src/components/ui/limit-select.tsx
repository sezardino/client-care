import {
  DEFAULT_PAGE_LIMIT_PAGE,
  DEFAULT_PAGE_LIMIT_PAGE_RANGE,
} from "@/const/base";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";

type Props = {
  current?: number;
  onChange: (limit: number) => void;
  label: string;
};

export const LimitSelect = (props: Props) => {
  const { current = DEFAULT_PAGE_LIMIT_PAGE, onChange, label } = props;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button size="sm" variant="bordered">
          {current}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        selectedKeys={[`${current}`]}
        className="min-w-unset"
        onAction={(key) => onChange(key as number)}
        aria-label={label}
      >
        {DEFAULT_PAGE_LIMIT_PAGE_RANGE.map((value) => (
          <DropdownItem key={value}>{value}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
