//approval.js
// React Imports
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { useFetcher } from "@/context/useFetcher";

// MUI Imports
import Modal from "@mui/material/Modal";

// Component Imports
import {
  PrimaryButton,
  SimpleButton,
  SubtleButton,
} from "@/components/base/Buttons";
import SuccessIcon from "@/components/icons/SuccessIcon";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";

export default function ApproveModal(props) {
  const { info, status } = props;
  const { data, isLoading, error, fetcher } = useFetcher();
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

  const handleApprove = async () => {
    setLoading(true);
    const payloadstatus = { status: status }; // Only include the status field
    //console.log('Payload being sent:', payloadstatus);
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API}/products/${info?.product_id}`,
      {
        method: "PUT",
        body: payloadstatus,
      }
    );
    //console.log('Payload data status:', payloadstatus);  // Debug: check the payload
    const json = await res;

    if (!res) {
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

  return (
    <Fragment>
      <PrimaryButton onClick={handleOpen}>
        <p className=" text-sm font-medium leading-5">Yes I&apos;m sure</p>
      </PrimaryButton>
      <Modal
        showBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="fixed top-[50%] left-[50%] flex w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col bg-white p-6 shadow-md">
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
                Approve {info?.style_id}
              </h2>
              <p
                id="child-modal-description"
                className="mb-8 text-sm font-light text-slate-700"
              >
                By clicking the confirm button you are changing the status from{" "}
                <span className="font-bold">{info?.status}</span> to{" "}
                <span className="font-bold">{status}</span>. This action cannot
                be undone.
              </p>
              <div className="flex gap-2 self-end">
                <SubtleButton onClick={handleClose}>Cancel</SubtleButton>
                <PrimaryButton onClick={handleApprove}>Confirm</PrimaryButton>
              </div>
            </>
          )}
        </div>
      </Modal>
      {isAlertVisible && (
        <div className="alert-container fixed left-24 bottom-12 z-50 max-w-md rounded-md bg-white shadow-lg transition">
          <div className="flex py-5 px-4">
            <div className="mr-4">
              <SuccessIcon width={24} height={24} />
            </div>
            <div className="mr-4 flex flex-col ">
              <p className="mb-1 text-sm font-semibold leading-5 text-slate-700">
                Product approved successfully
              </p>
              <p className=" text-sm font-normal text-slate-600">
                {info?.style_id} has been approved.
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
