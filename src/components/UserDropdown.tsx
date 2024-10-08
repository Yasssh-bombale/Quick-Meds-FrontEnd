import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userObject } from "@/feature/slices/user.slice";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";
import { useCheckUserHasStore } from "@/api/store-apis";

type Props = {
  user: userObject;
};

const UserDropdown = ({ user }: Props) => {
  const { check } = useCheckUserHasStore(user._id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden md:block" asChild>
        <img
          className="h-12 w-12 rounded-full object-cover cursor-pointer p-2"
          alt="user"
          src={user.profilePicture}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2">
        <DropdownMenuLabel className="text-sm font-medium">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {user.isAdmin ? (
            <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
              <Link to={"/applications"}>Store applications</Link>
            </DropdownMenuItem>
          ) : (
            <>
              {/* <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
                <Link to={"/user-profile"}>Profile</Link>
              </DropdownMenuItem> */}
              {check?.userHasStore && check.store.status === "approved" && (
                <>
                  <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
                    <Link to={"/manage-store"}>Manage Store</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
                    <Link to={"/conversations"}>Conversations</Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem className="font-semibold tracking-tight text-sm cursor-pointer p-2">
                <Link to={"/create-store"}>
                  {check?.store
                    ? "Check store approval status"
                    : "Create store"}
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* signOut button */}
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
