// Component Imports
import SectionTitle from "@/components/products/createModal/SectionTitle";

// Lib Imports
import { createField } from "@/lib/products/utilsCreateProduct";

export default function ProductDesignDetails(props) {
  const { fields, brick } = props;

  return (
    <>
      <SectionTitle title="Product Design Details" />
      <div className="mb-14 grid grid-cols-2 gap-6">
        {!brick && (
          <p className="col-span-full text-center text-gray-500">
            You need to fill all the hierarchy fields to see the design details
          </p>
        )}
        {fields.map((field) =>
          field.brick.includes(brick) ? createField(field) : null
        )}
      </div>
    </>
  );
}
