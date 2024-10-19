import {
  Button,
  ButtonProps,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import { PropsWithChildren } from "react";
import { Typography } from "./typography";

export type ModalDescriptionProps = {
  title: string;
  description: string;
};

export const ModalDescription = (props: ModalDescriptionProps) => {
  const { title, description } = props;

  return (
    <ModalHeader className="flex flex-col gap-2">
      <Typography level="h3" styling="h4" weight="medium">
        {title}
      </Typography>
      <Typography isMuted styling="small">
        {description}
      </Typography>
    </ModalHeader>
  );
};

export type ModalFooterWithActionsProps = {
  confirm: string;
  cancel: string;
  onConfirm?: () => void;
  onCancel: () => void;
  confirmColor?: ButtonProps["color"];
  isActionPending?: boolean;
  cancelColor?: ButtonProps["color"];
  form?: string;
};

export const ModalFooterWithActions = (props: ModalFooterWithActionsProps) => {
  const {
    confirm,
    cancel,
    onConfirm,
    cancelColor,
    onCancel,
    confirmColor,
    isActionPending,
    form,
  } = props;

  return (
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
        onPress={onCancel}
      >
        {cancel}
      </Button>
      <Button
        form={form}
        type={form ? "submit" : undefined}
        isLoading={isActionPending}
        color={confirmColor ? confirmColor : "primary"}
        onPress={onConfirm}
      >
        {confirm}
      </Button>
    </ModalFooter>
  );
};

export type ModalWrapperProps = PropsWithChildren &
  ModalProps & {
    isOpen: boolean;
    onClose: () => void;
    isClosePrevented?: boolean;
  };

export const ModalWrapper = (props: ModalWrapperProps) => {
  const { isOpen, onClose, isClosePrevented, children, ...rest } = props;

  const closeHandler = () => {
    if (isClosePrevented) return;
    onClose();
  };

  return (
    <Modal size="lg" {...rest} isOpen={isOpen} onClose={closeHandler}>
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export type ModalWithDescriptionProps = PropsWithChildren &
  ModalProps &
  ModalDescriptionProps & {
    isOpen: boolean;
    onClose: () => void;
    isClosePrevented?: boolean;
  };

export const ModalWithDescription = (props: ModalWithDescriptionProps) => {
  const {
    title,
    description,
    isOpen,
    onClose,
    isClosePrevented,
    children,
    ...rest
  } = props;

  const closeHandler = () => {
    if (isClosePrevented) return;
    onClose();
  };

  return (
    <ModalWrapper {...rest} isOpen={isOpen} onClose={closeHandler}>
      <ModalDescription title={title} description={description} />
      {children}
    </ModalWrapper>
  );
};
