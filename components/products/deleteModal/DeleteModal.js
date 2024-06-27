// React Imports
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useFetcher } from "@/context/useFetcher";

// MUI Imports
import Modal from "@mui/material/Modal";

// Component Imports
import {
  DangerButton,
  SubtleButton,
  SimpleButton,
  PrimaryButton,
} from "@/components/base/Buttons";
import DeleteIcon from "@/components/icons/DeleteIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
import DangerIcon from "@/components/icons/DangerIcon";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";

// Hook Imports
import { useUserRole, getFeature } from "@/hooks/auth/useUserRole";

export default function DeleteModal({ info }) {
  const { data, isLoading, error, fetcher } = useFetcher();
  const { userRole, userDepartment, userIsLoading } = useUserRole();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/products/${info?.product_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: { deleted: true, status: info?.status },
      }
    );

    const json = await res;

    if (error) {
      setLoading(false);
      setErrorMessage(true);
      setOpen(true);
    }

    if (res) {
      setOpen(false);
      setLoading(false);
      setErrorMessage(false);
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
        router.push("/products");
      }, 2500);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/products/${info?.product_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: { deleted: false, status: info?.status },
      }
    );

    const json = await res;

    if (error) {
      setLoading(false);
      setErrorMessage(true);
      setOpen(true);
    }

    if (res) {
      setOpen(false);
      setLoading(false);
      setErrorMessage(false);
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
        router.reload(window.location.pathname);
      }, 2500);
    }
  };

  if (userIsLoading) {
    return (
      <DangerButton size={"sm"}>
        <p className=" text-sm font-medium leading-5">
          <DeleteIcon />
        </p>
      </DangerButton>
    );
  }

  const canDelete = getFeature(userRole, "product design details")?.delete;

  if (canDelete)
    return (
      <Fragment>
        {(userDepartment === "admin" && info?.deleted === false) ||
        (userDepartment === "design" &&
          info?.status === "Design" &&
          info?.deleted === false) ? (
          <DangerButton size={"sm"} onClick={handleOpen}>
            <p className=" text-sm font-medium leading-5">
              <DeleteIcon />
            </p>
          </DangerButton>
        ) : (userDepartment === "admin" && info?.deleted === true) ||
          (userDepartment === "design" &&
            info?.status === "Design" &&
            info?.deleted === true) ? (
          // <SimpleButton size={"sm"} onClick={handleOpen} disabled={true}>
          //   <p className=" text-sm font-medium leading-5">Restore</p>
          // </SimpleButton>
          <></>
        ) : (
          <DangerButton size={"sm"} disabled>
            <p className=" text-sm font-medium leading-5">
              <DeleteIcon />
            </p>
          </DangerButton>
        )}
        <Modal
          showBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <div className="fixed left-[50%] top-[50%] flex w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col bg-white p-6 shadow-md">
            {loading ? (
              <>
                <div className="flex items-center justify-center p-12">
                  <LoadingScreen />
                </div>
              </>
            ) : errorMessage ? (
              <>
                <div className="flex items-center justify-center">
                  <p className="text-sm font-medium text-slate-700">
                    Something went wrong. Please try again. If the problem
                    persists please contact support.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2
                  id="child-modal-title"
                  className="mb-4 flex items-center gap-2 font-medium leading-5 text-slate-700"
                >
                  <ErrorIcon />
                  {info?.deleted ? "Restore" : "Delete"} {info?.style_id}
                </h2>
                <p
                  id="child-modal-description"
                  className="mb-8 text-sm font-light text-slate-700"
                >
                  {info?.deleted
                    ? `You are about to restore ${info?.style_id}, are you sure you want to do this?`
                    : `You are about to delete ${info?.style_id} from your database.
                  Are you sure you want to delete this item? The changes are
                  irreversible and cannot be recovered.`}
                </p>
                <div className="flex gap-2 self-end">
                  <SubtleButton onClick={handleClose}>Cancel</SubtleButton>
                  {info?.deleted ? (
                    <PrimaryButton onClick={handleRestore}>
                      Restore
                    </PrimaryButton>
                  ) : (
                    <DangerButton onClick={handleDelete}>Delete</DangerButton>
                  )}
                </div>
              </>
            )}
          </div>
        </Modal>

        {isAlertVisible && (
          <div className="alert-container fixed bottom-12 left-24 z-50 max-w-md rounded-md bg-white shadow-lg transition">
            <div className="flex px-4 py-5">
              <div className="mr-4">
                <DangerIcon width={24} height={24} />
              </div>
              <div className="mr-4 flex flex-col ">
                <p className="mb-1 text-sm font-semibold leading-5 text-slate-700">
                  {info?.deleted
                    ? "Product restored successfully"
                    : "Product deleted successfully"}
                </p>
                <p className=" text-sm font-normal text-slate-600">
                  {info?.style_id} has been{" "}
                  {info?.deleted ? "restored" : "deleted"}.
                </p>
              </div>
              <div
                onClick={() => setIsAlertVisible(false)}
                className="cursor-pointer text-xs text-slate-600 hover:text-slate-800"
              >
                &#x2715;
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
}
