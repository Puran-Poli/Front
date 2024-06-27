import { PrimaryButton, SubtleButton } from "@/components/base/Buttons";

export default function ImportSalesDataActions({ handleClose, handleSave }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex w-full flex-col justify-end bg-white">
      <hr />
      <div className="flex justify-end gap-2 px-6 py-6">
        <SubtleButton onClick={handleClose}>Cancel</SubtleButton>
        <PrimaryButton onClick={handleSave}>Upload</PrimaryButton>
      </div>
    </div>
  );
}
