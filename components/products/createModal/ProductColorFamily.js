// Lib Imports
import { getHexCode } from "@/lib/getHexCode";

export default function ProductColorFamily(props) {
  const { primaryColor, colorFamilies, hexCodes } = props;
  return (
    <div className="border-b border-b-gray-400">
      <p className="text-xs text-gray-500">Color Family</p>
      <div className="py-1">
        <span
          className="mr-1 inline-block h-4 w-4 rounded-full border align-middle"
          style={{
            backgroundColor: getHexCode(primaryColor, colorFamilies, hexCodes)
              .hexCode,
          }}
        ></span>
        {getHexCode(primaryColor, colorFamilies, hexCodes).colorFamily}
      </div>
    </div>
  );
}
