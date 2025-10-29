import React from "react";
import { GoStarFill } from "react-icons/go";
import { Link } from "react-router-dom";

const ProductCard = ({ product, cartcount, setcartcount }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ display: "block" }}>
      <div
        className="card"
        key={product.id}
        cartcount={cartcount}
        setcartcount={setcartcount}
      >
        <div className="img-container">
          <img src={product.thumbnail} alt={product.title} />
          <div id="product-discount">
            {Math.round(product.discountPercentage)}% off
          </div>
          <div
            id="product-status"
            style={{
              color:
                product.availabilityStatus === "Low Stock" ? "crimson" : "",
            }}
          >
            {product.availabilityStatus === "In Stock"
              ? "In Stock"
              : "Low Stock"}
          </div>

          <div id="rating">
            {product.rating.toFixed(1)}
            <GoStarFill /> / 5<GoStarFill />
          </div>
        </div>
        <div className="product-desc">
          <h4 className="product-title">{product.title}</h4>
          <div className="price-groce">
            <span className="product-price">$ {product.price}</span>
            <span className="product-category">{product.category}</span>
          </div>
        </div>
        {/* </> */}
      </div>
    </Link>
  );
};

export default ProductCard;
