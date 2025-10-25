// src/components/CartItem.jsx
import React from "react";
import { useDispatch } from "react-redux";
// import { increaseQty, decreaseQty, removeFromCart } from "../redux/feature/cart/cartSlice.js";
import { increaseQty, decreaseQty, removeFromCart } from "../redux/features/cart/cartSlice.js";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 items-center bg-white p-4 rounded-md shadow-sm">
      <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
      <div className="flex-1">
        <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(decreaseQty(item.id))}
          className="px-2 py-1 rounded-md border"
        >
          −
        </button>
        <div className="px-3">{item.quantity}</div>
        <button
          onClick={() => dispatch(increaseQty(item.id))}
          className="px-2 py-1 rounded-md border"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="mt-2 text-sm text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
