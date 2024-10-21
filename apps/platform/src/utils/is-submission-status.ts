import { SubmissionStatus } from "@prisma/client";
import { z } from "zod";

export const isSubmissionStatus = z.nativeEnum(SubmissionStatus).optional();
