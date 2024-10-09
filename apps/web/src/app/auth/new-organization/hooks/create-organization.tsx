import { ToastInner } from "@/components/ui/toast-inner";
import { ProjectUrls } from "@/const/url";
import { useServerMutation } from "@/libs/react-query/helpers";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrganization } from "../actions/create-organization";

export const useCreateOrganizationMutation = () => {
  const router = useRouter();

  return useServerMutation({
    mutationFn: createOrganization,
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
