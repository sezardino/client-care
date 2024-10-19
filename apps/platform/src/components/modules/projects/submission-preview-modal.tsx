import {
  ModalWithDescription,
  ModalWithDescriptionProps,
} from "@/components/ui/modal";
import { TextWithEllipsis } from "@/components/ui/text-with-ellipsis";
import { Typography } from "@/components/ui/typography";
import { DEFAULT_DATE_FORMAT } from "@/const/base";
import { SubmissionDetails } from "@/types/entities";
import { Button, ModalBody, ModalFooter, Tooltip } from "@nextui-org/react";
import dayjs from "dayjs";
import { AlertOctagon, PowerOff } from "lucide-react";
import { Fragment, useMemo } from "react";

type OmittedProps = Omit<
  ModalWithDescriptionProps,
  "children" | "title" | "description"
>;

export type SubmissionPreviewModalProps = OmittedProps & {
  submission?: SubmissionDetails;
  isLoading: boolean;
  onDeclineRequest: () => void;
  onReDeclineRequest: () => void;
  onProcessRequest: () => void;
};

export const SubmissionPreviewModal = (props: SubmissionPreviewModalProps) => {
  const {
    submission,
    isLoading,
    onClose,
    onDeclineRequest,
    onReDeclineRequest,
    ...rest
  } = props;

  const definitions = useMemo(() => {
    if (!submission || isLoading)
      return [
        { term: "Widget Name", description: "Loading..." },
        { term: "Widget Type", description: "Loading..." },
        { term: "Submission Date", description: "Loading..." },
        { term: "Submitted By", description: "Loading..." },
        { term: "Processing Status", description: "Loading..." },
      ];

    return [
      { term: "Widget Name", description: submission.widget.name },
      { term: "Widget Type", description: submission.widget.type },
      {
        term: "Submission Date",
        description: dayjs(submission.createdAt).format(DEFAULT_DATE_FORMAT),
      },
      {
        term: "Submitted By",
        description: submission.fullName
          ? `${submission.fullName} (${submission.email})`
          : submission.email,
      },
      { term: "Processing Status", description: submission.status },
    ];
  }, [submission]);

  return (
    <ModalWithDescription
      {...rest}
      onClose={onClose}
      title="Submission Details"
      description="You are viewing the details of this submission. Please check the information below."
      size="xl"
    >
      <ModalBody>
        <div className="flex flex-col gap-2">
          <Typography level="h3" weight="medium" styling="large">
            Submission information
            {submission?.widget.isTest && (
              <Tooltip content="Submitted from test widget">
                <AlertOctagon className="w-4 h-4 inline-block ml-1 text-warning-500" />
              </Tooltip>
            )}
            {!submission?.widget.isActive && (
              <Tooltip content="Submitted from disabled widget">
                <PowerOff className="w-4 h-4 inline-block ml-1 text-red-500" />
              </Tooltip>
            )}
          </Typography>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {definitions.map((d, index) => (
              <Fragment key={index}>
                <Typography asChild styling="small" weight="medium">
                  <dt>{d.term}:</dt>
                </Typography>
                <dd>
                  <TextWithEllipsis
                    level="span"
                    styling="small"
                    length={50}
                    text={d.description}
                  ></TextWithEllipsis>
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>
        <div>
          <Typography level="h3" weight="medium" styling="large">
            Submitted data
          </Typography>
          submitted data here
        </div>
      </ModalBody>
      <ModalFooter className="justify-between">
        <Button variant="bordered" color="primary" onClick={onClose}>
          Close
        </Button>
        <div className="flex items-center gap-3">
          {submission?.status === "NEW" && (
            <Button color="danger" onClick={onDeclineRequest}>
              Decline
            </Button>
          )}
          {submission?.status === "DECLINED" && (
            <Button color="danger" onClick={onReDeclineRequest}>
              Cancel Decline
            </Button>
          )}
          {/* TODO: implement this functionality */}
          {/* <Button color="success">Processing</Button> */}
        </div>
      </ModalFooter>
    </ModalWithDescription>
  );
};
