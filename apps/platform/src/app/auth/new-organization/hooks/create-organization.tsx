import { ToastInner } from "@/components/ui/toast-inner";
import { ProjectUrls } from "@/const/url";
import { NewOrganizationDto } from "@/dto/organization";
import { useServerMutation } from "@/libs/react-query/helpers";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrganization } from "../actions/create-organization";

export const useCreateOrganizationMutation = () => {
  const router = useRouter();

  return useServerMutation({
    mutationFn: async (values: NewOrganizationDto) => {
      const { logo, name, extra } = values;

      const formData = new FormData();
      formData.set("name", name);
      formData.set("logo", logo);
      if (extra) formData.set("extra", extra);

      return createOrganization(formData);
    },
    onSuccess: () => {
      toast.success(<ToastInner message="Organization created successfully" />);
      router.replace(ProjectUrls.dashboard);
    },
    onError: (error) =>
      toast.success(
        <ToastInner message={error.message} errors={error.errors} />
      ),
  });
};
