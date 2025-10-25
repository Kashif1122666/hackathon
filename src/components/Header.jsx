import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";
import { ShoppingCart } from "lucide-react";
import clsx from "clsx";

export default function Header({ theme, setTheme }) {
  const totalQuantity = useSelector((s) => s.cart.totalQuantity);
  const [pulse, setPulse] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (totalQuantity > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md border-b border-border bg-card/70">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-linear-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
            EN
          </div>
          <h1 className="text-lg font-semibold tracking-wide">Ecom Kaif</h1>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <Link
            to="/cart"
            className={clsx(
              "relative flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors",
              location.pathname === "/cart" && "bg-muted"
            )}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Cart</span>
            <span
              className={clsx(
                "ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full text-white",
                pulse ? "animate-pulse bg-indigo-600" : "bg-indigo-500"
              )}
            >
              {totalQuantity}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
