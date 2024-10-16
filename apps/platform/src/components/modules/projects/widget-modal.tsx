"use client";

import {
  NewWidgetForm,
  NewWidgetFormProps,
} from "@/components/form/new-widget";
import { ModalWrapper, ModalWrapperProps } from "@/components/ui/modal-wrapper";
import { Typography } from "@/components/ui/typography";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";

type PickerFormProps = Pick<
  NewWidgetFormProps,
  "onFormSubmit" | "initialValues" | "isCopy"
>;
type OmittedModalWrapperProps = Omit<ModalWrapperProps, "children">;

type Props = PickerFormProps &
  OmittedModalWrapperProps & {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
    onCancel?: () => void;
    isActionPending?: boolean;
  };

const FORM_ID = "widget-form-id";

export const WidgetFormModal = (props: Props) => {
  const {
    title,
    description,
    cancel,
    confirm,
    isActionPending,
    onClose,
    onCancel,
    onFormSubmit,
    initialValues,
    ...rest
  } = props;

  const cancelHandler = () => {
    onClose();
    onCancel?.();
  };

  return (
    <ModalWrapper {...rest} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex-col">
          <Typography level="h2" styling="h3" weight="medium">
            {title}
          </Typography>
          <Typography styling="small" isMuted>
            {description}
          </Typography>
        </ModalHeader>

        <ModalBody>
          <NewWidgetForm
            id={FORM_ID}
            onFormSubmit={onFormSubmit}
            initialValues={initialValues}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            isDisabled={isActionPending}
            variant="light"
            onClick={cancelHandler}
          >
            {cancel}
          </Button>
          <Button
            form={FORM_ID}
            isDisabled={isActionPending}
            type="submit"
            color="primary"
          >
            {isActionPending && <Spinner color="secondary" />}
            {confirm}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
};
