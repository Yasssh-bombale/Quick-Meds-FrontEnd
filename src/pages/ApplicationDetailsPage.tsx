import { useGetStoreDetails } from "@/api/store-apis";
import { Button } from "@/components/ui/button";
import { rejectReasons } from "@/constants";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import { useApproveApplication, useRejectApplications } from "@/api/admin.apis";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import LoadingButton from "@/components/LoadingButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const ApplicationDetailsPage = () => {
  const { storeId } = useParams();
  const [rejectClick, setRejectClick] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string[]>([]);
  const { _id: userId } = useAppSelector(
    (state: RootState) => state.userState.user
  );

  if (!storeId) {
    return;
  }

  const { store } = useGetStoreDetails(storeId);
  const { rejectApplication, isLoading: rejectLoading } = useRejectApplications(
    selectedReason,
    userId,
    storeId
  );

  const { approveApplication, isLoading: approveLoading } =
    useApproveApplication(userId, storeId);

  if (!store) {
    return <span>loading</span>;
  }
  const dataURLtoBlob = (dataurl: any) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Function to open the image in a new tab
  const openImageInNewTab = (dataurl: any) => {
    const blob = dataURLtoBlob(dataurl);
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="border overflow-hidden">
      <img
        src={store?.imageUrl}
        alt="storeImage"
        className="w-full h-60 object-cover rounded-md"
      />

      <div className="mt-2 border flex justify-between divide-x-2  divide-double divide-purple-500">
        {/* left part */}
        <div className="flex-1 px-2">
          <h1 className="text-lg font-medium line-clamp-1">
            Store :{" "}
            <span className="text-lg font-normal">{store.storeName}</span>
          </h1>
          <h1 className="text-lg font-medium line-clamp-1">
            storeId :{" "}
            <span className="text-base font-normal ">{store._id}</span>
          </h1>
          <h1 className="text-lg font-medium line-clamp-1">
            Owner :{" "}
            <span className="text-lg font-normal">{store.ownerName}</span>
          </h1>
          <h1 className="text-lg font-medium line-clamp-1">
            City : <span className="text-lg font-normal">{store.city}</span>
          </h1>
          <h1 className="text-lg font-medium line-clamp-1">
            State : <span className="text-lg font-normal">{store.state}</span>
          </h1>
          <h1 className="text-lg font-medium line-clamp-3">
            Address :{" "}
            <span className="text-lg font-normal">{store.address}</span>
          </h1>
        </div>

        {/* right part */}
        <div className="flex-1 flex">
          <img
            src={store?.ownerLivePicture}
            alt="license"
            className="object-cover h-40 flex-1 rounded-sm ml-2 cursor-pointer"
            onClick={() => {
              openImageInNewTab(store.ownerLivePicture);
            }}
          />
          <img
            src={store?.license}
            alt="license"
            className="object-cover h-40 flex-1 ml-2 rounded-sm cursor-pointer"
            onClick={() => {
              window.open(store.license, "_blank", "noopener,noreferrer");
            }}
          />
        </div>
      </div>

      {/* approval and reject button */}

      {rejectClick && (
        <div className="flex justify-center max-w-3xl w-full border m-auto overflow-hidden">
          <div className="border border-red-500 rounded-md mt-5 w-full px-1">
            <p className="text-xl font-semibold text-center">Tell us reasons</p>

            <div className="flex mt-3 gap-2 flex-wrap">
              {rejectReasons.map((reason, index) => {
                const isSelected = selectedReason.includes(reason);

                return (
                  <Button
                    key={index}
                    variant={"outline"}
                    className={`border ${
                      isSelected ? "border-green-600" : "border-red-300"
                    }`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedReason((prev) =>
                          prev.filter((r) => {
                            return reason !== r;
                          })
                        );
                      } else {
                        setSelectedReason((prev) => [...prev, reason]);
                      }
                    }}
                  >
                    {isSelected && (
                      <IoMdCheckmark color="green" className="h-5 w-5 mr-2" />
                    )}
                    {reason}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-2 mt-4">
        {!rejectClick && (
          <>
            <Button
              onClick={() => setRejectClick(true)}
              className="bg-red-500 hover:bg-red-500 hover:opacity-85"
            >
              Reject
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-600 hover:opacity-85">
                  Approve
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="">
                    {/* alert  */}
                    <Alert className="border border-red-500">
                      <AlertTriangle className="h-6 w-6 mt-2" color="red" />

                      <AlertDescription className="ml-2">
                        Are you sure you want to approve this store application?
                        Please confirm that you have verified the{" "}
                        <span className="font-semibold">validity</span> of this
                        store. After approval, this store will be listed on the{" "}
                        <span className="font-semibold">explore page</span> and
                        will become fully functional !
                      </AlertDescription>
                    </Alert>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {approveLoading ? (
                    <LoadingButton />
                  ) : (
                    <AlertDialogAction onClick={() => approveApplication()}>
                      Continue
                    </AlertDialogAction>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
        {rejectClick && (
          <div>
            <h1>Are you sure you want to reject this store?</h1>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => setRejectClick(false)}
                variant={"outline"}
                className="w-full"
              >
                Cancel
              </Button>
              {rejectLoading ? (
                <LoadingButton widthFull />
              ) : (
                <Button
                  onClick={() => rejectApplication()}
                  className="bg-red-500 hover:bg-red-500 hover:opacity-85 w-full"
                >
                  Yes,Reject
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetailsPage;
