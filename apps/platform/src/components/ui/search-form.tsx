import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useWatchEffect } from "@/hooks/use-watch-effect";
import { Button, cn, Input } from "@nextui-org/react";
import { Slot } from "@radix-ui/react-slot";
import { Search } from "lucide-react";
import {
  ComponentPropsWithoutRef,
  FormEvent,
  useId,
  useRef,
  useState,
} from "react";

type OmittedFormProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;

type Props = OmittedFormProps & {
  onFormSubmit: (value: string) => void;
  asChild?: boolean;
  placeholder: string;
  label: string;
};

const MIN_SEARCH_LENGTH = 3;

export const SearchForm = (props: Props) => {
  const { label, placeholder, onFormSubmit, asChild, className, ...rest } =
    props;
  const Comp = asChild ? Slot : "form";

  const id = useId();
  const [value, setValue] = useState<string>("");
  const [debouncedValue] = useDebouncedValue(value, 300);

  const isSubmitted = useRef(false);
  const submitResetTimer = useRef<NodeJS.Timeout | null>(null);

  const triggerSearch = () => {
    if (isSubmitted.current) return;
    if (value.length < MIN_SEARCH_LENGTH) return onFormSubmit("");
    if (value === debouncedValue) return;

    onFormSubmit(value);
    isSubmitted.current = true;
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    triggerSearch();
  };

  const keydownHandler = (evt: KeyboardEvent) => {
    if (evt.key !== "Enter") return;

    evt.preventDefault();
    triggerSearch();
  };

  useWatchEffect(() => {
    if (isSubmitted.current) return;
    if (value.length < MIN_SEARCH_LENGTH) return onFormSubmit("");

    onFormSubmit(debouncedValue);
    isSubmitted.current = true;
  }, [debouncedValue]);

  useWatchEffect(() => {
    if (submitResetTimer.current) clearTimeout(submitResetTimer.current);

    submitResetTimer.current = setTimeout(() => {
      isSubmitted.current = false;
    }, 500);
  }, [isSubmitted.current]);

  return (
    <Comp
      {...rest}
      className={cn(className)}
      onSubmit={submitHandler}
      aria-label={label}
    >
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        onValueChange={(value) => setValue(value)}
        // @ts-expect-error // eslint-disable-line @typescript-eslint/ban-ts-comment
        onKeyDown={keydownHandler}
        endContent={
          <Button
            isIconOnly
            size="sm"
            color="primary"
            variant="light"
            aria-label={label}
          >
            <Search className="w-4 h-4" />
          </Button>
        }
      />
    </Comp>
  );
};
