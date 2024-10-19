import { cn, Input, Textarea } from "@nextui-org/react";
import { Star } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  email: string;
  fullName?: string;
  message?: string;
  rating: number;
};

export const FeedbackPreview = (props: Props) => {
  const { email, fullName, message, rating, className, ...rest } = props;

  return (
    <div {...rest} className={cn("grid grid-cols-2 gap-4", className)}>
      <Input
        label="Full name"
        placeholder="Not provided"
        value={fullName}
        readOnly
      />
      <Input label="Email" placeholder="Not provided" value={email} readOnly />
      <Textarea
        label="Message"
        placeholder="Not provided"
        value={message}
        readOnly
        className="col-span-2"
      />
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-6 h-6 ${
              index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-semibold">{rating}/5</span>
      </div>
    </div>
  );
};
