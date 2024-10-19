import { ProjectUrls } from "@/const/url";
import { useClerk } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

export const useApplicationLogout = () => {
  const { signOut } = useClerk();
  const queryClient = useQueryClient();

  const logout = useCallback(async () => {
    try {
      await signOut({ redirectUrl: ProjectUrls.login });
      queryClient.clear();
      toast.success("You are logged out successfully");
    } catch {
      toast.error("Something went wrong");
    }
  }, [queryClient, signOut]);

  return { logout };
};
