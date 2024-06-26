import thinkImage from "../img/think.jpg";
const NoOrders = () => {
  return (
    <div className="flex flex-col md:flex-row items-center mt-20">
      <img src={thinkImage} alt="think" className="w-40 h-40 object-cover" />
      <h1 className="text-xl md:text-5xl">
        👋 Hey, your store has no orders yet!
      </h1>
    </div>
  );
};

export default NoOrders;
