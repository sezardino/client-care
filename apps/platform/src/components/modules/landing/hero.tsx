"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

const content = {
  title: "Support System That Works for You",
  subtitle: `Client Care is an innovative widget that allows your customers to submit requests and receive support in real-time.`,
  cta: "View Features",
};

export const LandingHeroSection = () => {
  return (
    <section className="py-32 pb-16">
      <div className="container">
        <h1 className="mb-6 text-4xl font-bold leading-none tracking-tighter md:text-[7vw] lg:text-8xl">
          {content.title}
        </h1>
        <p className="max-w-2xl text-muted-foreground md:text-[2vw] lg:text-xl">
          {content.subtitle}
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-10">
          <Button
            as={Link}
            href="#features"
            color="primary"
            className="w-full md:w-auto"
          >
            {content.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};
