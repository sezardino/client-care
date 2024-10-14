import { USER_INVITE_SEARCH_PARAMETER } from "@/const/search-params";
import { Metadata } from "next";
import { checkUserInvite } from "../actions/check-invition";
import { RegistrationTemplate } from "./components/template";

export const metadata: Metadata = { title: "Registration" };

type Props = { searchParams: { [USER_INVITE_SEARCH_PARAMETER]: string } };

const Page = async (props: Props) => {
  const inviteId = props.searchParams[USER_INVITE_SEARCH_PARAMETER];

  const checkInvitingResponse = inviteId
    ? await checkUserInvite(inviteId)
    : null;

  return (
    <RegistrationTemplate
      inviteId={inviteId}
      inviteValidationError={
        checkInvitingResponse && "message" in checkInvitingResponse
          ? checkInvitingResponse.message
          : undefined
      }
    />
  );
};

export default Page;
