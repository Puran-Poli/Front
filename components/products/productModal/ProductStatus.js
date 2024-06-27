import { useState } from "react";

// MUI Imports
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";

// Component Imports
import ApproveModal from "@/components/products/approveModal/ApproveModal";
import { SubtleButton } from "@/components/base/Buttons";

// Hook Imports
import { useUserRole } from "@/hooks/auth/useUserRole";

export default function ProductStatus(props) {
  const { userRole, userDepartment, userIsLoading } = useUserRole();
  const { info } = props;
  const [status, setStatus] = useState(info?.status);

  const handleCancel = () => {
    setStatus(info?.status);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  if (userIsLoading) return null;

  return (
    <div className="flex items-center gap-2">
      <FormControl variant="standard" size="sm">
        <InputLabel id="filter-by-label">Status</InputLabel>
        <Select
          labelId="filter-by-label"
          id="filter-by"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem
            value={"Design"}
            disabled={
              ((userDepartment === "admin" || userDepartment === "design") &&
                status === "Design") ||
              (status !== "Design" && userDepartment === "admin")
                ? false
                : true
            }
          >
            Design
          </MenuItem>
          <MenuItem
            value={"Merchandise"}
            disabled={
              ((userDepartment === "admin" || userDepartment === "design") &&
                status === "Design") ||
              (status !== "Design" && userDepartment === "admin")
                ? false
                : true
            }
          >
            Merchandise
          </MenuItem>
          <MenuItem
            value={"Catalog"}
            disabled={
              ((userDepartment === "admin" || userDepartment === "catalog") &&
                status === "Catalog") ||
              (status !== "Catalog" && userDepartment === "admin")
                ? false
                : true
            }
          >
            Catalog
          </MenuItem>
          <MenuItem
            value={"Commercial"}
            disabled={
              ((userDepartment === "admin" || userDepartment === "catalog") &&
                status === "Catalog") ||
              (status !== "Catalog" && userDepartment === "admin")
                ? false
                : true
            }
          >
            Commercial
          </MenuItem>
          <MenuItem
            value={"Approved"}
            disabled={
              ((userDepartment === "admin" ||
                userDepartment === "commercial") &&
                status === "Commercial") ||
              (status !== "Commercial" && userDepartment === "admin")
                ? false
                : true
            }
          >
            Approved
          </MenuItem>
        </Select>
      </FormControl>
      {status !== info?.status && (
        <Modal open={true} onClose={handleCancel}>
          <div className="fixed top-[50%] left-[50%] flex w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col bg-white p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-2 font-medium leading-5 text-slate-700">
              Are you sure you want to change the status of this product?
            </h2>
            <p className="mb-8 text-sm font-light text-slate-700">
              Changing the status means that the product will be moved to the{" "}
              <span className="font-bold">next department.</span>
            </p>
            <div className="flex gap-2 self-end">
              <SubtleButton onClick={handleCancel}>
                <p className=" text-sm font-medium leading-5">Cancel</p>
              </SubtleButton>
              <ApproveModal info={info} status={status} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
