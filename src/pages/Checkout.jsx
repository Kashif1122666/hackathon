// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../redux/feature/cart/cartSlice.js";
import { clearCart } from "../redux/features/cart/cartSlice.js";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, totalPrice } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple validation
    if (!form.name || !form.email || !form.address) {
      alert("Please fill name, email and address.");
      return;
    }

    // "Place order"
    alert("Order placed successfully!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Checkout</h2>
        <p className="text-sm text-gray-500">Fill out details and place order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form className="lg:col-span-2 bg-white p-6 rounded-md shadow-sm" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="p-3 border rounded-md"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-3 border rounded-md"
            />
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="p-3 border rounded-md"
            />
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              placeholder="ZIP / Postal code"
              className="p-3 border rounded-md"
            />
          </div>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full mt-4 p-3 border rounded-md"
            rows={4}
          />

          <div className="mt-4 flex gap-3">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              Place Order
            </button>
            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="px-4 py-2 border rounded-md text-red-600"
            >
              Clear Cart
            </button>
          </div>
        </form>

        <aside className="bg-white p-6 rounded-md shadow-sm">
          <h3 className="text-lg font-medium">Order Summary</h3>
          <div className="mt-4 space-y-3">
            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-500">No items in cart.</p>
            ) : (
              cartItems.map((it) => (
                <div key={it.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={it.image} alt={it.title} className="w-10 h-10 object-contain" />
                    <div className="text-sm">
                      <div className="line-clamp-1">{it.title}</div>
                      <div className="text-xs text-gray-500">x{it.quantity}</div>
                    </div>
                  </div>
                  <div className="font-medium">${(it.price * it.quantity).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
