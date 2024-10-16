import {
  ModalDescription,
  ModalDescriptionProps,
  ModalFooterWithActions,
  ModalFooterWithActionsProps,
  ModalWrapper,
  ModalWrapperProps,
} from "./modal";

type AlertModalProps = ModalDescriptionProps &
  Omit<ModalFooterWithActionsProps, "onCancel"> &
  Omit<ModalWrapperProps, "children"> & { onCancel?: () => void };

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
      <ModalDescription title={title} description={description} />

      <ModalFooterWithActions
        isActionPending={isActionPending}
        cancel={cancel}
        confirm={confirm}
        onCancel={cancelHandler}
        onConfirm={onConfirm}
        cancelColor={cancelColor}
        confirmColor={confirmColor}
      />
    </ModalWrapper>
  );
};
