/* eslint-disable @typescript-eslint/ban-ts-comment */
import Script from "next/script";

const Page = () => {
  return (
    <>
      <main>test page with widget</main>
      {/* @ts-ignore */}
      <feedback-widget token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiJjbTJhbXJzdXgwMDAwaHdlN2sya2ppOWd6Iiwib3JnYW5pemF0aW9uSWQiOiJjbTI4MDd5ZHAwMDAzZzZzNGZydGR1czNmIiwid2lkZ2V0SWQiOiJjbTJkaDAzZm0wMDAwMTE1YmhqdWd1OGFuIiwiaWF0IjoxNzI5MTc5NzkzLCJleHAiOjMzMjU1MjIyMTkzfQ.QCxhoWoRkm2s6I2ccv0b_LY0_8ZvEx-RT57ed-W1bGM"></feedback-widget>
      <Script src="https://client-care-widget-dev.vercel.app/widget.umd.js" />
    </>
  );
};

export default Page;
