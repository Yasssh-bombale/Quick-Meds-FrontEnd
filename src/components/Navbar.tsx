import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.userState);

  return (
    <>
      <Link to={"/"} className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="scroll-m-20 text-lg md:text-lg font-semibold tracking-tight"
        >
          Home
        </Button>
      </Link>
      <Link to={"/explore"} className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="scroll-m-20 text-lg md:text-lg font-semibold tracking-tight"
        >
          Explore stores
        </Button>
      </Link>
      <Link to={"/orders"} className="cursor-pointer">
        <Button
          variant={"ghost"}
          className="scroll-m-20 text-lg md:text-lg font-semibold tracking-tight"
        >
          Order status
        </Button>
      </Link>

      {user ? (
        <UserDropdown user={user} />
      ) : (
        <Link to={"/signin"} className="w-full">
          <Button className="text-[17px] tracking-tight w-full">SignIn</Button>
        </Link>
      )}
    </>
  );
};

export default Navbar;
