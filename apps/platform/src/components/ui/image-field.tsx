import { ACCEPTED_IMAGE_TYPES } from "@/const/base";
import { Avatar, Button, cn, Tooltip } from "@nextui-org/react";
import {
  Building,
  Folder,
  Image as ImageIcon,
  LucideProps,
  Trash2,
  User,
} from "lucide-react";
import {
  ChangeEvent,
  ForwardRefExoticComponent,
  RefAttributes,
  useId,
  useRef,
  useState,
} from "react";
import { Noop } from "react-hook-form";
import { FormItem, FormMessage } from "./form";

type PlaceholderType = "folder" | "user" | "building";
type FieldSizes = "lg" | "md";

export type ImageFormFieldProps = {
  initialUrl?: string;
  placeholderType?: PlaceholderType;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  size?: FieldSizes;
  onBlur: Noop;
  className?: string;
  inputId?: string;
};

const defaultPlaceholder = ImageIcon;
const placeholders: Record<
  PlaceholderType,
  ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
> = {
  building: Building,
  folder: Folder,
  user: User,
};

const circleSizes: Record<FieldSizes, string> = {
  lg: "w-32 h-32",
  md: "w-24 h-24",
};

const iconsSizes: Record<FieldSizes, string> = {
  lg: "w-16 h-16",
  md: "w-12 h-12",
};

export const ImageFormField = (props: ImageFormFieldProps) => {
  const {
    size = "lg",
    onChange,
    placeholderType,
    onDelete,
    onBlur,
    initialUrl,
    inputId: id,
    className,
  } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const generatedId = useId();
  const inputId = id ? id : generatedId;

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

  const Fallback = placeholderType
    ? placeholders[placeholderType]
    : defaultPlaceholder;

  return (
    <FormItem className={cn(className)}>
      <div className="flex justify-center items-center relative">
        <Avatar
          htmlFor={inputId}
          as="label"
          size="lg"
          src={imagePreview || undefined}
          fallback={<Fallback className={iconsSizes[size]} />}
          className={cn("cursor-pointer", circleSizes[size])}
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
        id={inputId}
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
