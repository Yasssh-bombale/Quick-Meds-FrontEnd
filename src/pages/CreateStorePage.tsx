import CreateStoreForm from "@/forms/store-forms/CreateStoreForm";

import img1 from "../img/createStoreImage1.png";
import { useCreateStore, useGetMyStore } from "@/api/store-apis";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import BackButton from "@/components/BackButton";
import StoreCard from "@/components/create-store/StoreApplicationCard";

const CreateStorePage = () => {
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  const { createStore, loading, setLoading } = useCreateStore(userId);
  const { store, isLoading: getLoading } = useGetMyStore(userId);

  if (getLoading) {
    return <span>loading...</span>;
  }

  return (
    <div
      className={`flex flex-row border-2 items-center border-[#9E3FFD] rounded-md mt-10 p-2 relative ${
        store && "-mt-0"
      }`}
    >
      {store ? (
        <div className="flex-col flex lg:flex-row justify-center gap-2">
          <BackButton backTo="/home" />
          <StoreCard store={store} />
        </div>
      ) : (
        <>
          <img
            src={img1}
            alt="error"
            className="h-96 w-96 object-cover hidden lg:block"
          />
          <div className="p-2  w-full ">
            <CreateStoreForm
              onSave={createStore}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateStorePage;
