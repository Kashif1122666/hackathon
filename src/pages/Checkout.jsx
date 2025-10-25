import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cart/cartSlice.js";
import { Input } from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Checkout() {
  const { cartItems, totalPrice } = useSelector((s) => s.cart);
  const [showDialog, setShowDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    card: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate and submit
  const handleOrder = (e) => {
    e.preventDefault();

    // validation
    if (!form.name || !form.address || !form.city || !form.card || !email || !zip) {
      toast.error("Please fill in all fields before proceeding.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setShowDialog(true);
    dispatch(clearCart());

    // redirect to home after a small delay
    setTimeout(() => {
      setShowDialog(false);
      navigate("/");
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto bg-card/70 backdrop-blur p-6 rounded-xl border border-border space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center">Checkout</h2>

      {/* 🛍️ Order summary */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg border-b border-border pb-2">
          Your Items
        </h3>

        {cartItems.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No items in cart.
          </p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-muted/40 border border-border rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain rounded-md"
                  />
                  <div>
                    <p className="font-medium line-clamp-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} × ${item.price}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🧾 Checkout form */}
      <form onSubmit={handleOrder} className="space-y-4">
        <Input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <Input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />
        <Input
          name="card"
          placeholder="Credit Card Number"
          value={form.card}
          onChange={handleChange}
        />

        {/* New Email and Zip fields */}
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="grow"
          />
          <Input
            type="text"
            placeholder="Zip Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-24"
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Pay ${totalPrice.toFixed(2)}
        </Button>
      </form>

      {/* 🎉 Success dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-card/80 backdrop-blur-md border border-border">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              🎉 Order Placed Successfully!
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-muted-foreground mt-2">
            Thank you for shopping with <strong>Ecom Kaif</strong>.
          </p>
          <p className="text-center text-sm mt-2">Redirecting to home...</p>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
