import { PropsWithChildren } from "react";
import { LandingFooter } from "../modules/layout/landing-footer";
import { LandingHeader } from "../modules/layout/landing-header";

export const LandingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <LandingHeader />
      {children}
      <LandingFooter />
    </>
  );
};
