"use client";

import {
  NewProjectForm,
  NewProjectFormProps,
} from "@/components/form/new-project";
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
  onFormSubmit: NewProjectFormProps["onFormSubmit"];
};

const FORM_ID = "new-project-form-id";

export const CreateProjectModal = (props: Props) => {
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
            Create new Project
          </Typography>
          <Typography styling="small">
            Fill needed fields to create new project.
          </Typography>
        </ModalHeader>

        <ModalBody>
          <NewProjectForm id={FORM_ID} onFormSubmit={onFormSubmit} />
        </ModalBody>

        <ModalFooter>
          <Button color="danger" variant="light" onClick={cancelHandler}>
            Cancel
          </Button>
          <Button form={FORM_ID} type="submit" color="primary">
            Create new Project
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
