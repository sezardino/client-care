import {
  Button,
  ButtonProps,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Spinner,
} from "@nextui-org/react";
import { Typography } from "./typography";

type PickedProps = Pick<ModalProps, "isOpen" | "onClose">;

type AlertModalProps = PickedProps & {
  isClosePrevented?: boolean;
  title: string;
  description: string;
  confirm: string;
  cancel: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmColor?: ButtonProps["color"];
  cancelColor?: ButtonProps["color"];
  isActionPending?: boolean;
};

export const AlertModal = (props: AlertModalProps) => {
  const {
    title,
    description,
    confirm,
    cancel,
    isOpen,
    onConfirm,
    onCancel,
    onClose,
    cancelColor,
    confirmColor,
    isActionPending,
    isClosePrevented,
  } = props;

  const closeHandler = () => {
    if (isClosePrevented) return;
    onClose?.();
  };

  const cancelHandler = () => {
    onCancel?.();
    closeHandler();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler} size="lg">
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
    </Modal>
  );
};
