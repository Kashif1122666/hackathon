// src/pages/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
// import { clearCart } from "../redux/feature/cart/cartSlice.js";
import { clearCart } from "../redux/features/cart/cartSlice.js";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, totalPrice, totalQuantity } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Cart</h2>
        <div className="text-sm text-gray-600">Items: {totalQuantity}</div>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white p-8 rounded-md shadow-sm text-center">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((it) => (
              <CartItem key={it.id} item={it} />
            ))}
          </div>

          <aside className="bg-white p-6 rounded-md shadow-sm">
            <h3 className="text-lg font-medium">Order Summary</h3>
            <div className="mt-4 flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => navigate("/checkout")}
                className="w-full px-4 py-2 rounded-md bg-indigo-600 text-white"
              >
                Checkout
              </button>

              <button
                onClick={() => dispatch(clearCart())}
                className="w-full px-4 py-2 rounded-md border text-red-600"
              >
                Clear Cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
