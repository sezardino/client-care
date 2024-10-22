import { setProfileAvatar } from "@/actions/users/set-profile-avatar";
import { CURRENT_USER_QUERY_KEY } from "@/app/hooks/current-user";
import { ToastInner } from "@/components/ui/toast-inner";
import { useServerMutation } from "@/libs/react-query/helpers";
import { ImageDto } from "@/schemas/dto/image";
import { toast } from "sonner";

export const useSetProfileAvatarMutation = () => {
  return useServerMutation({
    mutationFn: async (values: ImageDto) => {
      const { image } = values;

      const formData = new FormData();
      formData.set("image", image);

      return setProfileAvatar(formData);
    },
    getQueriesToInvalidate: () => [[CURRENT_USER_QUERY_KEY]],
    onSuccess: () =>
      toast.success(<ToastInner message="Avatar changed successfully" />),
    onError: (error) =>
      toast.error(<ToastInner message={error.message} errors={error.errors} />),
  });
};
