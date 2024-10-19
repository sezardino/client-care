import { DateBadge } from "@/components/ui/date-badge";
import {
  ModalWithDescription,
  ModalWithDescriptionProps,
} from "@/components/ui/modal";
import { TextWithEllipsis } from "@/components/ui/text-with-ellipsis";
import { Typography } from "@/components/ui/typography";
import { SubmissionDetails } from "@/types/entities";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  ModalBody,
  ModalFooter,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import { AlertOctagon, PowerOff } from "lucide-react";
import { Fragment, useMemo } from "react";
import { WidgetTypeBadge } from "../../ui/project-type-badge";
import { SubmissionStatusBadge } from "../../ui/submission-status-badge";
import { FeedbackPreview } from "../widget-preview/feedback";

type OmittedProps = Omit<
  ModalWithDescriptionProps,
  "children" | "title" | "description"
>;

export type SubmissionPreviewModalProps = OmittedProps & {
  submission?: SubmissionDetails;
  isSubmissionLoading: boolean;
  isActionPending: boolean;
  onDeclineRequest: () => void;
  onReDeclineRequest: () => void;
  onProcessRequest: () => void;
};

export const SubmissionPreviewModal = (props: SubmissionPreviewModalProps) => {
  const {
    submission,
    isSubmissionLoading,
    isActionPending,
    onClose,
    onDeclineRequest,
    onReDeclineRequest,
    ...rest
  } = props;

  const definitions = useMemo(() => {
    if (!submission || isSubmissionLoading)
      return [
        { term: "Widget Name", description: "Loading..." },
        { term: "Widget Type", description: "Loading..." },
        { term: "Submission Date", description: "Loading..." },
        { term: "Submitted By", description: "Loading..." },
        { term: "Processing Status", description: "Loading..." },
      ];

    return [
      { term: "Widget Name", description: submission.widget.name },
      {
        term: "Widget Type",
        description: <WidgetTypeBadge type={submission.widget.type} />,
      },
      {
        term: "Submission Date",
        description: <DateBadge date={submission.createdAt} />,
      },

      {
        term: "Processing Status",
        description: <SubmissionStatusBadge status={submission.status} />,
      },
    ];
  }, [isSubmissionLoading, submission]);

  return (
    <ModalWithDescription
      {...rest}
      onClose={onClose}
      title="Submission Details"
      description="You are viewing the details of this submission. Please check the information below."
      size="xl"
    >
      <ModalBody>
        <Card>
          <CardHeader>
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
          </CardHeader>
          <CardBody>
            <dl className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1">
              {definitions.map((d, index) => (
                <Fragment key={index}>
                  <Typography asChild styling="small" weight="medium">
                    <dt>{d.term}:</dt>
                  </Typography>
                  <dd>
                    <TextWithEllipsis level="span" styling="small" length={50}>
                      {d.description}
                    </TextWithEllipsis>
                  </dd>
                </Fragment>
              ))}
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Typography level="h3" weight="medium" styling="large">
              Submitted data
            </Typography>
          </CardHeader>
          <CardBody>
            {!submission && isSubmissionLoading && (
              <Skeleton className="w-full h-80 rounded-md" />
            )}

            {submission &&
              !isSubmissionLoading &&
              submission.widget.type === "FEEDBACK" &&
              submission.feedback && (
                <FeedbackPreview
                  email={submission.email}
                  fullName={submission.fullName}
                  rating={submission.feedback.rating}
                  message={submission.feedback.message}
                />
              )}
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter className="justify-between">
        <Button
          variant="bordered"
          color="primary"
          isDisabled={isActionPending}
          onClick={onClose}
        >
          Close
        </Button>
        <div className="flex items-center gap-3">
          {submission?.status === "NEW" && (
            <Button
              color="danger"
              isLoading={isActionPending}
              onClick={onDeclineRequest}
            >
              Decline
            </Button>
          )}
          {submission?.status === "DECLINED" && (
            <Button
              color="danger"
              isLoading={isActionPending}
              onClick={onReDeclineRequest}
            >
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
