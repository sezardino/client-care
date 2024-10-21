import { updateProfileData } from "@/actions/users/update-profile-data";
import { CURRENT_USER_QUERY_KEY } from "@/app/hooks/current-user";
import { ToastInner } from "@/components/ui/toast-inner";
import { ProfileDto } from "@/dto/profile";
import { useServerMutation } from "@/libs/react-query/helpers";
import { toast } from "sonner";

export const useUpdateProfileDataMutation = () => {
  return useServerMutation({
    mutationFn: async (values: ProfileDto) => updateProfileData(values),
    getQueriesToInvalidate: () => [[CURRENT_USER_QUERY_KEY]],
    onSuccess: () =>
      toast.success(<ToastInner message="Profile data updated successfully" />),
    onError: (error) =>
      toast.error(<ToastInner message={error.message} errors={error.errors} />),
  });
};
