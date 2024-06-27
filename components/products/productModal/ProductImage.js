import { useState } from "react";
import Image from "next/image";

// React Slick Imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: "1" }}
      onClick={onClick}
    />
  );
}

export default function ProductImage({ info }) {
  return (
    <>
      {info?.images?.length > 0 ? (
        <Slider
          dots={true}
          infinite={true}
          speed={500}


          
          slidesToShow={1}
          slidesToScroll={1}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {info?.images?.map((image, i) => (
            <div key={i} className="relative aspect-[2/2.5]">
              <Image
                src={image}
                alt={`Image of ${info?.style_id}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="relative aspect-[2/2.5]">
          <Image
            src={"/images/no-image.svg"}
            alt={`Image of ${info?.style_id}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
    </>
  );
}
