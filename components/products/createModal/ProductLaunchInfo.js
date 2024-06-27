// Component Imports
import SectionTitle from "@/components/products/createModal/SectionTitle";

// Lib Imports
import { createField } from "@/lib/products/utilsCreateProduct";

export default function ProductLaunchInfo(props) {
  const { fields } = props;

  return (
    <>
      <SectionTitle title="Product Launch Info" />
      <div className="mb-14 grid grid-cols-2 gap-6">
        {fields.map((field) => createField(field))}
      </div>
    </>
  );
}
