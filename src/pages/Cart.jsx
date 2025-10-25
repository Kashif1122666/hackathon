import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { motion } from "framer-motion";

export default function Cart() {
  const { cartItems, totalPrice } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-muted-foreground">
        <p>Your cart is empty 🛒</p>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go Shopping
        </Button>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto space-y-5"
    >
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-muted/50 rounded-lg border border-border">
        <p className="font-semibold text-lg">Total: ${totalPrice.toFixed(2)}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
          <Button onClick={() => navigate("/checkout")}>Checkout</Button>
        </div>
      </div>
    </motion.div>
  );
}
