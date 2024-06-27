// Component Imports
import SectionTitle from "@/components/products/createModal/SectionTitle";
import ProductHierarchyField from "@/components/products/createModal/ProductHierarchyField";

export default function ProductHierarchy(props) {
  const { fields, disabled } = props;

  return (
    <>
      <SectionTitle title="Product Hierarchy" />
      {fields.map((details) => (
        <ProductHierarchyField
          key={details.id}
          disabled={disabled ? disabled : false}
          details={details}
        />
      ))}
    </>
  );
}
