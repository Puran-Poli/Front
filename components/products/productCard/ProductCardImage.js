import { useState } from "react";
import Image from "next/image";

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default function ProductImageCard({ options }) {
  const [src, setSrc] = useState(
    options?.image ? options?.image : "/images/no-image.svg"
  );
  return (
    <div>
      <Image
        src={src}
        alt={`Image of ${options?.style_id}`}
        width={300}
        height={300}
        placeholder="blur"
        blurDataURL={rgbDataURL(241, 245, 249)}
        className="absolute top-0 left-0 h-full w-full object-cover"
        onError={() => {
          setSrc("/images/broken-image.png");
        }}
      />
    </div>
  );
}
