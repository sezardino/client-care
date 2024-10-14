import { ProjectUrls } from "@/const/url";
import { useApplicationLogout } from "@/hooks/use-logout";
import { CurrentUserData } from "@/types/user";
import { getUserInfo } from "@/utils/user-info";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownProps,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";

type OmittedProps = Omit<DropdownProps, "children">;

type Props = OmittedProps & {
  user: CurrentUserData;
};

export const UserDropdown = (props: Props) => {
  const { user, ...rest } = props;
  const { logout } = useApplicationLogout();

  return (
    <Dropdown {...rest} placement="bottom">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          size="sm"
          className="transition-transform"
          src={user.avatarUrl || undefined}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{getUserInfo(user)}</p>
        </DropdownItem>
        <DropdownItem key="dashboard" as={Link} href={ProjectUrls.dashboard}>
          Dashboard
        </DropdownItem>
        <DropdownItem key="projects" as={Link} href={ProjectUrls.projects}>
          Projects
        </DropdownItem>
        <DropdownItem key="settings" as={Link} href={ProjectUrls.userSettings}>
          Settings
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
