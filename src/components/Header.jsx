// src/components/Header.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const totalQuantity = useSelector((s) => s.cart.totalQuantity);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-linear-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            E
          </div>
          <div>
            <h1 className="text-lg font-semibold">MiniShop</h1>
            <p className="text-xs text-gray-500">React Hackathon</p>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm ${location.pathname === "/" ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"}`}
          >
            Home
          </Link>

          <Link
            to="/cart"
            className={`relative px-3 py-2 rounded-md text-sm ${location.pathname === "/cart" ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"}`}
          >
            Cart
            <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-medium leading-none text-white bg-indigo-600 rounded-full">
              {totalQuantity}
            </span>
          </Link>

          <Link
            to="/checkout"
            className={`px-3 py-2 rounded-md text-sm ${location.pathname === "/checkout" ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-100"}`}
          >
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}
