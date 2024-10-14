"use client";

import { useCurrentUserQuery } from "@/app/hooks/current-user";
import { PropsWithChildren } from "react";
import { LandingFooter } from "../modules/layout/landing-footer";
import { LandingHeader } from "../modules/layout/landing-header";

type Props = PropsWithChildren & {};

export const LandingLayout = (props: Props) => {
  const { children } = props;
  const { data: user } = useCurrentUserQuery();

  return (
    <>
      <LandingHeader user={user || null} />
      {children}
      <LandingFooter isUserAuthenticated={!!user} />
    </>
  );
};
