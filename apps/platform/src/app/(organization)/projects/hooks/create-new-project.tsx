import { ToastInner } from "@/components/ui/toast-inner";
import { ProjectUrls } from "@/const/url";
import { NewProjectDto } from "@/dto/project";
import { useServerMutation } from "@/libs/react-query/helpers";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createNewProject } from "../actions/create-new-project";

export const useCreateNewProjectMutation = () => {
  const router = useRouter();

  return useServerMutation({
    mutationFn: async (values: NewProjectDto) => {
      const { logo, name, description, url } = values;

      const formData = new FormData();
      formData.set("name", name);
      formData.set("logo", logo);
      formData.set("description", description);
      formData.set("url", url);

      return createNewProject(formData);
    },
    onSuccess: (res) => {
      toast.success(<ToastInner message="Project created successfully" />);
      router.replace(ProjectUrls.project(res.id));
    },
    onError: (error) =>
      toast.success(
        <ToastInner message={error.message} errors={error.errors} />
      ),
  });
};
