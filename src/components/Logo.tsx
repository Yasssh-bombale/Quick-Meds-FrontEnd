import { Link } from "react-router-dom";

type Props = {
  className?: string;
};
const Logo = ({ className }: Props) => {
  return (
    <div
      className={`bg-[#9E3FFD] px-2 py-1 rounded-lg cursor-pointer w-fit ${className}`}
    >
      <Link to={"/"}>
        <h1 className="lg:text-3xl text-xl font-bold tracking-tight text-white text-nowrap">
          Quick meds
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
