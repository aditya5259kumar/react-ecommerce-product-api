import React, { useContext } from "react";
import { ProductContext } from "../App";
import ProductCard from "../component/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

const ProductByCategory = ({
  category,
  categoryHead,
  // cartcount,
  // setcartcount,
}) => {
  const { Data } = useContext(ProductContext);

  const FilteredProducts = Data.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <>
      <section id={`category-${category.toLowerCase()}`} className="category-section container">
        <h2 className="category-section-head">{categoryHead}</h2>
        <div id="category-line"></div>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          speed={2000}
          breakpoints={{
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 15,
            },
            880: {
              slidesPerView: 3,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 20,
            },
          }}
          className="product-grid"
        >
          {FilteredProducts.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <ProductCard
                  product={product}
                  // cartcount={cartcount}
                  // setcartcount={setcartcount}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </>
  );
};

export default ProductByCategory;
