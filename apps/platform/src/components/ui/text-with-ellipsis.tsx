import { Tooltip } from "@nextui-org/react";
import { Typography, TypographyProps } from "./typography";

type Props = TypographyProps & {
  length?: number;
};

export const TextWithEllipsis = (props: Props) => {
  const { children, length, ...rest } = props;

  if (typeof children !== "string")
    return <Typography {...rest}>{children}</Typography>;

  const formattedText =
    length && children.length > length
      ? `${children.slice(0, length)}...`
      : children;
  const inner = <Typography {...rest}>{formattedText}</Typography>;

  if (length && children.length > length) {
    return <Tooltip content={children}>{inner}</Tooltip>;
  }

  return inner;
};
