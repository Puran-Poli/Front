// Component Imports
import Card from "@/components/products/Card";
import CreateModal from "@/components/products/createModal/CreateModal";
import ExportModal from "@/components/products/ExportModal";
import ImportModal from "@/components/products/ImportModal";
import ProductSort from "@/components/products/ProductSort";
import { useFetcher } from "@/context/useFetcher";

// Hooks Imports
import { useHierarchy, useOptions } from "@/hooks/products/useProducts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Products({ products, sorting }) {
  const { hierarchy, fieldOptions } = useHierarchy();
  const { colors } = useOptions();
  const [checkboxed, setCheckboxed] = useState([]);
  const [defaultStatus, setDefaultStatus] = useState("None");
  const { fetcher, fetchError } = useFetcher();
  const router = useRouter();

  useEffect(() => {
    if (checkboxed.length > 10) {
      toast.error("You can only select 10 items at a time", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setCheckboxed(checkboxed.slice(0, 10));
    }
  }, [
    checkboxed
  ]);

  if (!colors && !hierarchy && !fieldOptions) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <p className="text-2xl font-semibold text-slate-500">Loading</p>
      </div>
    );
  }

  const handleClick = async () => {
    try {
      const data = {
        productIds: checkboxed,
        newStatus: defaultStatus,
      }
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_PRODUCTS_API}/import/updateStatus/`,
        {
          method: "PUT",
          body: data,
        }
      );

      //const res = await response.json();
      console.log(response)
      if (
        response?.status === "success"
      ) {
        toast.success("Status updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        setCheckboxed([]);
        setTimeout(() => {
          router.reload(window.location.pathname);
        }, 1000);
      }
      else {
        toast.error("Something went wrong, please try again!", {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      }
    }
    catch (error) {
      toast.error("Something went wrong, please try again!", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }
  }

  return (
    <div className="flex flex-col pt-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium leading-7">
          Products
          <span className="ml-1 text-xs font-light tracking-wide text-slate-500">
            {" "}
            - {products?.info?.total_items} items
          </span>
        </h1>
        <div className="flex gap-2 self-end">
          {checkboxed.length > 0 && <div className="flex gap-2">
            <FormControl sx={{ minWidth: 240 }} size="small">
              <InputLabel id="sorting-select">Status</InputLabel>
              <Select
                labelId="status-label"
                id="sorting-select"
                value={defaultStatus}
                label="Status"
                onChange={
                  (event) => setDefaultStatus(event.target.value)
                }
              >
                <MenuItem
                  value={"None"}
                >
                  Choose Status
                </MenuItem>
                <MenuItem
                  value={"Merchandise"}
                >
                  Merchandise
                </MenuItem>
              </Select>
            </FormControl>
            <button className={`flex h-10 cursor-pointer items-center justify-center gap-4 rounded-[3px] bg-[#0052CC] px-3 py-1 text-sm font-medium leading-5 tracking-tight text-white transition hover:bg-[#0065FF] focus:bg-blue-800 focus:text-white focus:shadow-md active:bg-[#0747A6] active:text-white disabled:cursor-not-allowed disabled:bg-gray-500 text-sm font-medium leading-5 `} disabled={checkboxed.length == 0 || defaultStatus === "None"} onClick={handleClick}>
              Bulk Edit ({checkboxed.length})
            </button>
          </div>}
          <ImportModal />
          <ExportModal />
          <CreateModal
            hierarchyData={hierarchy}
            fieldOptions={fieldOptions}
            colorFamilies={colors.colors}
            hexCodes={colors.hex_codes}
          />
        </div>
      </div>
      <hr className="my-5 mb-8 border" />
      <ProductSort sorting={sorting} />
      <div className="products__grid-autoflow grid gap-6">
        {products?.info.items.map((product) => (
          <Card
            key={product.product_id}
            options={product}
            hierarchy={hierarchy}
            colorFamilies={colors.colors}
            hexCodes={colors.hex_codes}
            fieldOptions={fieldOptions}
            checkboxed={checkboxed}
            setCheckboxed={setCheckboxed}
          />
        ))}
      </div>
    </div>
  );
}
