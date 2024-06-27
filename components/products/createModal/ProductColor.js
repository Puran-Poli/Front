// Component Imports
import SectionTitle from "@/components/products/createModal/SectionTitle";
import ProductColorFamily from "@/components/products/createModal/ProductColorFamily";

// Lib Imports
import { createField } from "@/lib/products/utilsCreateProduct";

export default function ProductColor(props) {
  const { fields } = props;

  return (
    <>
      <SectionTitle title="Product Color" />
      <div className="mb-14 grid grid-cols-2 gap-6">
        {fields.map((field) => createField(field))}
        <ProductColorFamily {...props} />
      </div>
    </>
  );
}
