// Component Imports
import SectionTitle from "@/components/products/createModal/SectionTitle";

// MUI Imports
import CreatableSelect from "react-select/creatable";
import ProductExclusivity from "@/components/products/createModal/ProductExclusivity";

export default function ProductTags(props) {
  const {
    tagInputValue,
    tagOnChange,
    tagOnInputChange,
    tagOnKeyDown,
    tagValue,
  } = props;

  return (
    <>
      <SectionTitle title="Product Tags" />
      <div className="grid grid-cols-2 gap-6 pb-36">
        <div>
          <p className="pb-1 text-xs text-gray-500">Tags</p>
          <CreatableSelect
            components={{ DropdownIndicator: null }}
            inputValue={tagInputValue}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={tagOnChange}
            onInputChange={tagOnInputChange}
            onKeyDown={tagOnKeyDown}
            placeholder="Type tags and press enter..."
            value={tagValue}
          />
          
          <p className="col-span-2 mt-4 text-sm text-gray-600 bg-gray-100 p-2 rounded">
            <strong>Use any of these tags for adding logos:</strong> EASY CARE, WRINKLE FREE, MEMORY STRETCH, COMFORT STRETCH
          </p>
        </div>
        <ProductExclusivity {...props} />
      </div>
    </>
  );
}
