import { ACCEPTED_IMAGE_TYPES } from "@/const/base";
import { Avatar, Button, cn, Tooltip } from "@nextui-org/react";
import {
  Building,
  Folder,
  Image as ImageIcon,
  Trash2,
  User,
} from "lucide-react";
import { ChangeEvent, ReactNode, useRef, useState } from "react";
import { Noop } from "react-hook-form";
import { FormItem, FormMessage } from "./form";

type PlaceholderType = "folder" | "user" | "building";

type Props = {
  initialUrl?: string;
  placeholderType?: PlaceholderType;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onBlur: Noop;
  className?: string;
};

const defaultPlaceholder = <ImageIcon className="w-16 h-16" />;
const placeholders: Record<PlaceholderType, ReactNode> = {
  building: <Building className="w-16 h-16" />,
  folder: <Folder className="w-16 h-16" />,
  user: <User className="w-16 h-16" />,
};

const INPUT_ID = "file-input-id";

export const ImageFormField = (props: Props) => {
  const { onChange, placeholderType, onDelete, onBlur, initialUrl, className } =
    props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialUrl || null
  );

  const resetInput = () => {
    if (!inputRef.current) return;

    inputRef.current.value = "";
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onChange(event);
    setImagePreview(URL.createObjectURL(file));
    resetInput();
  };

  const deleteHandler = () => {
    onDelete();
    setImagePreview(null);
    resetInput();
  };

  const fallback = placeholderType
    ? placeholders[placeholderType]
    : defaultPlaceholder;

  return (
    <FormItem className={cn(className)}>
      <div className="flex justify-center items-center relative">
        <Avatar
          htmlFor={INPUT_ID}
          as="label"
          size="lg"
          src={imagePreview || undefined}
          fallback={fallback}
          className="cursor-pointer w-32 h-32"
        />
        {imagePreview && (
          <Tooltip content="Delete">
            <Button
              color="danger"
              type="button"
              isIconOnly
              size="sm"
              className="absolute top-0 right-0"
              onClick={deleteHandler}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Tooltip>
        )}
      </div>

      <input
        ref={inputRef}
        name="logo"
        id={INPUT_ID}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="sr-only"
        onChange={changeHandler}
        onBlur={onBlur}
      />

      <FormMessage className="text-center" />
    </FormItem>
  );
};
