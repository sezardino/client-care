import { ProjectUrls } from "@/const/url";
import { useClerk } from "@clerk/nextjs";
import { useCallback } from "react";
import { toast } from "sonner";

export const useApplicationLogout = () => {
  const { signOut } = useClerk();

  const logout = useCallback(async () => {
    try {
      signOut({ redirectUrl: ProjectUrls.home });
      toast.success("You are logged out successfully");
    } catch {
      toast.error("Something went wrong");
    }
  }, [signOut]);

  return { logout };
};
