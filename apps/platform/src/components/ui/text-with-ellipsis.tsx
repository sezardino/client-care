import { Tooltip } from "@nextui-org/react";
import { Typography, TypographyProps } from "./typography";

type Props = TypographyProps & {
  length?: number;
  text: string;
};

export const TextWithEllipsis = (props: Props) => {
  const { text, length, ...rest } = props;

  const formattedText =
    length && text.length > length ? `${text.slice(0, length)}...` : text;
  const inner = <Typography {...rest}>{formattedText}</Typography>;

  if (length && text.length > length) {
    return <Tooltip content={text}>{inner}</Tooltip>;
  }

  return inner;
};
