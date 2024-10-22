import { createNewProject } from "@/actions/projects/create-new-project";
import { ProjectUrls } from "@/const/url";
import { useServerMutation } from "@/libs/react-query/helpers";
import { NewProjectDto } from "@/schemas/dto/project";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateNewProjectMutation = () => {
  const router = useRouter();

  return useServerMutation({
    mutationFn: async (values: NewProjectDto) => {
      const { logo, name, description, url } = values;

      const formData = new FormData();
      formData.set("name", name);
      formData.set("logo", logo);
      if (description) formData.set("description", description);
      if (url) formData.set("url", url);

      return createNewProject(formData);
    },
    onSuccess: (res) => {
      toast.success("Project created successfully");
      router.replace(ProjectUrls.project(res.id));
    },
  });
};
