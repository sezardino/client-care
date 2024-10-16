import { Modal, ModalProps } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export type ModalWrapperProps = PropsWithChildren &
  ModalProps & {
    isOpen: boolean;
    onClose: () => void;
    isClosePrevented?: boolean;
  };

export const ModalWrapper = (props: ModalWrapperProps) => {
  const { isOpen, onClose, isClosePrevented, children } = props;

  const closeHandler = () => {
    if (isClosePrevented) return;
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler} size="lg">
      {children}
    </Modal>
  );
};
