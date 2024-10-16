import {
  ModalWithDescription,
  ModalWithDescriptionProps,
} from "@/components/ui/modal";
import { Typography } from "@/components/ui/typography";
import { formatWidgetSnippet } from "@/utils/format-widget-snippet";
import {
  Button,
  ModalBody,
  ModalFooter,
  Skeleton,
  Snippet,
} from "@nextui-org/react";

type Props = Omit<ModalWithDescriptionProps, "children"> & {
  snippet?: string[];
  isLoading?: boolean;
};

export const WidgetCodeSnippetModal = (props: Props) => {
  const { isLoading, snippet, onClose, ...rest } = props;

  return (
    <ModalWithDescription {...rest} onClose={onClose} size="3xl">
      <ModalBody className="flex flex-col gap-4">
        {isLoading && <Skeleton className="w-full h-20 rounded-lg" />}
        {!isLoading && (
          <Snippet size="lg" codeString={snippet?.join("")}>
            {snippet?.map((code, index) => (
              <span key={index}>{formatWidgetSnippet(code)}</span>
            ))}
          </Snippet>
        )}

        <Typography
          styling="xs"
          isMuted
          className="mx-auto max-w-[80%] text-center"
        >
          Make sure to replace the placeholder values (if any) with your actual
          data. If you're using a test widget, it will work on any domain, but
          the number of submissions will be limited.
        </Typography>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalWithDescription>
  );
};
