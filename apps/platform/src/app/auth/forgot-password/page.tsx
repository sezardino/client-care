import type { Metadata } from "next";
import { ForgotPasswordPageTemplate } from "./components/template";

export const metadata: Metadata = { title: "Forgot password" };

const Page = () => {
  return (
    <main>
      <ForgotPasswordPageTemplate />
    </main>
  );
};

export default Page;
