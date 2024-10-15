import { CURRENT_USER_QUERY_KEY } from "@/app/hooks/current-user";
import { ToastInner } from "@/components/ui/toast-inner";
import { useServerMutation } from "@/libs/react-query/helpers";
import { toast } from "sonner";
import { deleteProfileUserAvatar } from "../actions/delete-profile-avatar";

export const useDeleteProfileAvatarMutation = () => {
  return useServerMutation({
    mutationFn: async () => deleteProfileUserAvatar(),
    onSuccess: () =>
      toast.success(<ToastInner message="Avatar deleted successfully" />),
    onError: (error) =>
      toast.error(<ToastInner message={error.message} errors={error.errors} />),
    getQueriesToInvalidate: () => [[CURRENT_USER_QUERY_KEY]],
  });
};
