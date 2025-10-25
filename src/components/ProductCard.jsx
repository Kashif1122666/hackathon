// src/components/ProductCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/feature/cart/cartSlice";
import { addToCart } from "../redux/features/cart/cartSlice.js";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    // we dispatch the whole product (id, title, price, image)
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    }));
  };

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="w-full h-56 flex items-center justify-center p-4">
        <img src={product.image} alt={product.title} className="max-h-48 object-contain" />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
        <p className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</p>

        <div className="mt-4">
          <button
            onClick={handleAdd}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
