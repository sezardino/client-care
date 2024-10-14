"use client";

import { Typography } from "@/components/ui/typography";
import { ProjectUrls } from "@/const/url";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Divider,
  Link,
} from "@nextui-org/react";
import { ArrowRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";

type Props = CardProps & {
  id: string;
  name: string;
  url: string;
  logoUrl?: string;
  description: string;
};

export const ProjectCard = (props: Props) => {
  const { name, url, logoUrl, description, id, ...rest } = props;

  return (
    <Card {...rest} as="article" className="">
      <CardHeader className="flex gap-3">
        {logoUrl ? (
          <Image
            alt={name}
            height={40}
            src={logoUrl}
            width={40}
            className="aspect-square object-cover"
          />
        ) : (
          <ImageIcon className="w-10 h-10" />
        )}
        <div className="flex flex-col">
          <Typography styling="large" weight="medium">
            {name}
          </Typography>
          <Typography styling="small">{url}</Typography>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {description ? (
          <Typography styling="xs">{description}</Typography>
        ) : (
          <Typography styling="xxs" className="opacity-50">
            Description not provided
          </Typography>
        )}
      </CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-between">
        <Link as={NextLink} size="sm" href={ProjectUrls.project(id)}>
          To project
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};
