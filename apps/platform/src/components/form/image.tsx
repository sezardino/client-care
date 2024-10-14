"use client";

import { ACCEPTED_IMAGE_TYPES } from "@/const/base";
import { ImageDto, ImageDtoSchema } from "@/dto/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, cn, Spinner, Tooltip } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";

type Props = ComponentPropsWithoutRef<"form"> & {
  initialImageUrl?: string;
  onFormSubmit: (values: ImageDto) => Promise<unknown>;
  onTryToDeleteImage: () => void;
};

export const ImageForm = (props: Props) => {
  const {
    initialImageUrl,
    onFormSubmit,
    className,
    onTryToDeleteImage,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImageUrl || null
  );

  const form = useForm<ImageDto>({
    resolver: zodResolver(ImageDtoSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      form.setValue("image", file, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const handleDeleteImage = () => {
    if (initialImageUrl) return onTryToDeleteImage();

    setImagePreview(null);
    form.reset();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("flex flex-col gap-3", className)}
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          <div className="relative">
            <Avatar
              size="lg"
              src={imagePreview || undefined}
              className="w-24 h-24"
            />
            {imagePreview && (
              <Tooltip content="Delete image">
                <Button
                  isIconOnly
                  color="danger"
                  size="sm"
                  isDisabled={form.formState.isSubmitting}
                  className="absolute top-0 right-0 translate-x-1/2"
                  onClick={handleDeleteImage}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Tooltip>
            )}
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            <Button
              as="label"
              color="default"
              size="sm"
              isDisabled={form.formState.isSubmitting}
              className="cursor-pointer"
            >
              Select Image
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                onChange={handleImageChange}
                className="sr-only"
              />
            </Button>
            {form.formState.isDirty && (
              <Button
                type="submit"
                color="success"
                size="sm"
                isDisabled={form.formState.isSubmitting}
                startContent={
                  form.formState.isSubmitting ? (
                    <Spinner size="sm" />
                  ) : undefined
                }
              >
                Submit
              </Button>
            )}
          </div>
        </div>
        {typeof form.formState.errors.image?.message === "string" && (
          <p className="text-red-500">{form.formState.errors.image.message}</p>
        )}
      </form>
    </Form>
  );
};
