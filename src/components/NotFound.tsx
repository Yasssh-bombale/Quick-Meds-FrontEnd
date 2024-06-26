import { Link } from "react-router-dom";
import look from "../img/Look.jpg";
import { Button } from "./ui/button";
import Logo from "./Logo";

type Props = {
  message: string;
  buttonText: string;
  linkTo: string;
};

const NotFound = ({ message, buttonText, linkTo }: Props) => {
  return (
    <div className="h-screen mt-80 md:mt-0">
      <div className="flex items-center gap-x-3 mt-20 justify-center">
        <img
          src={look}
          alt="look"
          className="w-32 h-32 md:w-56 md:h-56 object-cover"
        />
        <div className="flex items-center justify-center flex-col gap-y-2">
          <h1 className="text-sm md:text-xl flex  flex-row items-center gap-x-3 ">
            {message} <Logo />
          </h1>
          <Link to={linkTo}>
            <Button>{buttonText}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
