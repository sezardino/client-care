"use client";

import { Typography } from "@/components/ui/typography";
import { NextErrorSegment } from "@/types/jwt";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";

const Error = (props: NextErrorSegment) => {
  const { error, reset } = props;

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <Typography
        level="h2"
        styling="h2"
        weight="medium"
        className="text-center"
      >
        Something went wrong!
      </Typography>
      <Button
        color="primary"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </main>
  );
};

export default Error;
