/* eslint-disable @typescript-eslint/ban-ts-comment */
import Script from "next/script";

const Page = () => {
  return (
    <>
      <main>test page</main>
      {/* @ts-ignore */}
      <feedback-widget projectId="123"></feedback-widget>
      <Script src="http://localhost:5173/widget.umd.js" />
    </>
  );
};

export default Page;
