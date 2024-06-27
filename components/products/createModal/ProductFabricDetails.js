// Component Imports
import SectionTitle from "@/components/products/createModal/SectionTitle";

// Lib Imports
import { createField } from "@/lib/products/utilsCreateProduct";

export default function ProductFabricDetails(props) {
  const { fields, brick } = props;

  return (
    <>
      <SectionTitle title="Product Fabric Details" />
      <div className="mb-14 grid grid-cols-2 gap-6">
        {!brick && (
          <p className="col-span-full text-center text-gray-500">
            You need to fill all the hierarchy fields to see the fabric details
          </p>
        )}
        {fields.map((field) =>
          field.brick.includes(brick) ? createField(field) : null
        )}
      </div>
    </>
  );
}
