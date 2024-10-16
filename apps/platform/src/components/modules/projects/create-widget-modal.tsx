"use client";

import {
  NewWidgetForm,
  NewWidgetFormProps,
} from "@/components/form/new-widget";
import { Typography } from "@/components/ui/typography";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onFormSubmit: NewWidgetFormProps["onFormSubmit"];
};

const FORM_ID = "new-widget-form-id";

export const CreateWidgetModal = (props: Props) => {
  const { isOpen, onClose, onCancel, onFormSubmit } = props;

  const cancelHandler = () => {
    onClose();
    onCancel?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex-col">
          <Typography level="h2" styling="h3" weight="medium">
            Create New Widget
          </Typography>
          <Typography styling="small" isMuted>
            Set up a new widget to start collecting submissions. You can create
            a test widget to explore its functionality or a live widget for
            actual use.
          </Typography>
        </ModalHeader>

        <ModalBody>
          <NewWidgetForm id={FORM_ID} onFormSubmit={onFormSubmit} />
        </ModalBody>

        <ModalFooter>
          <Button color="danger" variant="light" onClick={cancelHandler}>
            Cancel
          </Button>
          <Button form={FORM_ID} type="submit" color="primary">
            Create Widget
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
