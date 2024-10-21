"use client";

import { ImageDto, ImageDtoSchema } from "@/dto/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, cn, Spinner } from "@nextui-org/react";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { ImageFormField, ImageFormFieldProps } from "../ui/image-field";

type Props = ComponentPropsWithoutRef<"form"> & {
  initialImageUrl?: string;
  onFormSubmit: (values: ImageDto) => Promise<unknown>;
  onTryToDeleteImage: () => void;
  imagePlaceholderType: ImageFormFieldProps["placeholderType"];
};

export const ImageForm = (props: Props) => {
  const {
    imagePlaceholderType,
    initialImageUrl,
    onFormSubmit,
    className,
    onTryToDeleteImage,
    ...rest
  } = props;

  const form = useForm<ImageDto>({
    resolver: zodResolver(ImageDtoSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const handleDeleteImage = () => {
    if (initialImageUrl) return onTryToDeleteImage();

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        {...rest}
        className={cn("flex flex-col gap-3", className)}
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onBlur } }) => (
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <ImageFormField
                inputId={"field-id"}
                placeholderType={imagePlaceholderType}
                onBlur={onBlur}
                size="md"
                onChange={handleImageChange}
                onDelete={handleDeleteImage}
              />

              <div className="flex gap-3 items-center flex-wrap">
                <Button
                  as="label"
                  htmlFor="field-id"
                  color="default"
                  size="sm"
                  isDisabled={form.formState.isSubmitting}
                  className="cursor-pointer"
                >
                  Select Image
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
          )}
        />

        {typeof form.formState.errors.image?.message === "string" && (
          <p className="text-red-500">{form.formState.errors.image.message}</p>
        )}
      </form>
    </Form>
  );
};
