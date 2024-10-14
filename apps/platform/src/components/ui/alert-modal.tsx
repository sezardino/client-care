import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import { Typography } from "./typography";

type PickedProps = Pick<ModalProps, "isOpen" | "onClose">;

type AlertModalProps = PickedProps & {
  title: string;
  description: string;
  confirm: string;
  cancel: string;
  onConfirm: () => void;
  onCancel?: () => void;
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
  } = props;

  const cancelHandler = () => {
    onCancel?.();
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <Typography level="h3">{title}</Typography>
          <Typography>{description}</Typography>
        </ModalHeader>

        <ModalFooter>
          <Button color="danger" variant="light" onPress={cancelHandler}>
            {cancel}
          </Button>
          <Button color="primary" onPress={onConfirm}>
            {confirm}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
