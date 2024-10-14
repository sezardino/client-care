/* eslint-disable @typescript-eslint/ban-ts-comment */
import Script from "next/script";

const Page = () => {
  return (
    <>
      <main>test page with widget</main>
      {/* @ts-ignore */}
      <feedback-widget token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6IjEiLCJwcm9qZWN0SWQiOiIyIiwiaWF0IjoxNzI4NTUxMjU4LCJleHAiOjMzMjU0NTkzNjU4fQ.IMZOkUo2tfFBkHjJruxvuuKmzd2M_JcPVEWUFFQbaKk"></feedback-widget>
      <Script src="https://client-care-widget.vercel.app/widget.umd.js" />
    </>
  );
};

export default Page;
