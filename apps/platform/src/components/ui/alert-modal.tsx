import {
  Button,
  ButtonProps,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { ModalWrapper, ModalWrapperProps } from "./modal-wrapper";
import { Typography } from "./typography";

type AlertModalProps = Omit<ModalWrapperProps, "children"> & {
  title: string;
  description: string;
  confirm: string;
  cancel: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmColor?: ButtonProps["color"];
  isActionPending?: boolean;
  cancelColor?: ButtonProps["color"];
};

export const AlertModal = (props: AlertModalProps) => {
  const {
    title,
    description,
    confirm,
    cancel,
    onConfirm,
    onCancel,
    onClose,
    cancelColor,
    confirmColor,
    isActionPending,
    isClosePrevented,
    ...rest
  } = props;

  const cancelHandler = () => {
    if (isClosePrevented) return;
    onCancel?.();
    onClose();
  };

  return (
    <ModalWrapper
      {...rest}
      isClosePrevented={isClosePrevented}
      onClose={onClose}
      size="lg"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-2">
          <Typography level="h3" styling="h4" weight="medium">
            {title}
          </Typography>
          <Typography isMuted styling="small">
            {description}
          </Typography>
        </ModalHeader>

        <ModalFooter>
          <Button
            isDisabled={isActionPending}
            color={
              cancelColor
                ? cancelColor
                : confirmColor === "danger"
                  ? "default"
                  : "danger"
            }
            variant="light"
            onPress={cancelHandler}
          >
            {cancel}
          </Button>
          <Button
            isDisabled={isActionPending}
            color={confirmColor ? confirmColor : "primary"}
            onPress={onConfirm}
          >
            {isActionPending && <Spinner />}
            {confirm}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
};
