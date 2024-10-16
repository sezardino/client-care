import { ModalBody } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import {
  ModalDescription,
  ModalDescriptionProps,
  ModalFooterWithActions,
  ModalFooterWithActionsProps,
  ModalWrapper,
  ModalWrapperProps,
} from "./modal";

type ModalWithFormProps = ModalDescriptionProps &
  Omit<ModalFooterWithActionsProps, "onCancel" | "form"> &
  Omit<ModalWrapperProps, "children"> & {
    formId: string;
  } & PropsWithChildren & { onCancel?: () => void };

export const ModalWithForm = (props: ModalWithFormProps) => {
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
    formId,
    children,
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
    >
      <ModalDescription title={title} description={description} />

      <ModalBody>{children}</ModalBody>

      <ModalFooterWithActions
        isActionPending={isActionPending}
        cancel={cancel}
        confirm={confirm}
        onCancel={cancelHandler}
        onConfirm={onConfirm}
        cancelColor={cancelColor}
        confirmColor={confirmColor}
        form={formId}
      />
    </ModalWrapper>
  );
};
