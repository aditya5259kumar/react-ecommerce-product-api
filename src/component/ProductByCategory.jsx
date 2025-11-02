import React, { useContext } from "react";
import { ProductContext } from "../App";
import ProductCard from "../component/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductByCategory = ({
  category,
  categoryHead,
  // cartcount,
  // setcartcount,
}) => {
  var settings = {
    dots: true,
    // infinite: true,

    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,

    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { Data } = useContext(ProductContext);

  const FilteredProducts = Data.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <>
      {/* category anchor target for hero quick-links: id is like category-fragrances */}
      <section id={`category-${category.toLowerCase()}`} className="category-section container">
        <h2 className="category-section-head">{categoryHead}</h2>
        <div id="category-line"></div>

        <Slider {...settings} className="product-grid">
          {FilteredProducts.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                // cartcount={cartcount}
                // setcartcount={setcartcount}
              />
            );
          })}
        </Slider>
      </section>
    </>
  );
};

export default ProductByCategory;
