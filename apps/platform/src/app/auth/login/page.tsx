import { Metadata } from "next";
import { LoginPageTemplate } from "./components/template";

export const metadata: Metadata = { title: "Login" };

const Page = () => {
  return (
    <main>
      <LoginPageTemplate />
    </main>
  );
};

export default Page;
