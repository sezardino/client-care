"use client";

import { Typography } from "@/components/ui/typography";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import { PropsWithChildren } from "react";

type PickedProps = Pick<ModalProps, "isOpen" | "onClose">;

type Props<T extends Record<string, unknown>> = PickedProps & {
  original: T;
  updated: Partial<T>;
  title: string;
  description: string;
  confirm: string;
  cancel: string;
  copy: Record<keyof T, string>;
  render: Record<keyof T, (original: T, changed: Partial<T>) => JSX.Element>;
  onCancel?: () => void;
  onConfirm: () => void;
};

export const EditionDifferenceModal = <T extends Record<string, unknown>>(
  props: Props<T>
) => {
  const {
    original,
    updated,
    render,
    isOpen,
    copy,
    title,
    description,
    cancel,
    confirm,
    onClose,
    onCancel,
    onConfirm,
  } = props;

  const cancelHandler = () => {
    onCancel?.();
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="max-w-4xl min-h-96">
        <ModalHeader className="flex-col gap-1">
          <Typography level="h3" weight="medium" styling="h3">
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-1 items-start">
            <Typography>Previous values</Typography>
            <Typography>New values</Typography>
          </div>
          <ul className="flex flex-col gap-4">
            {Object.keys(updated).map((key) => (
              <DifferenceItem key={key} title={copy[key]}>
                {render[key](original, updated)}
              </DifferenceItem>
            ))}
          </ul>
        </ModalBody>

        <ModalFooter className="mt-4 self-end sm:justify-between gap-2">
          <Button color="danger" variant="light" onClick={cancelHandler}>
            {cancel}
          </Button>
          <Button color="primary" onClick={onConfirm}>
            {confirm}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const editionDifferenceModalStringDifferenceRenderFunction = (
  original?: string | null,
  updated?: string | null
) => (
  <>
    <Typography styling={!original ? "xs" : undefined}>
      {original ? original : "Not provided"}
    </Typography>
    <Typography styling={!updated ? "xs" : undefined}>
      {updated ? updated : "Delete totally"}
    </Typography>
  </>
);
type DifferenceItemProps = PropsWithChildren & {
  title: string;
};

const DifferenceItem = (props: DifferenceItemProps) => {
  const { title, children } = props;

  return (
    <li className="flex flex-col gap-1">
      <Typography>{title}:</Typography>
      <div className="grid grid-cols-2 gap-1 items-start">{children}</div>
    </li>
  );
};
