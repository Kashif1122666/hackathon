import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice.js";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="flex flex-col justify-between h-full overflow-hidden bg-card/70 backdrop-blur border-border hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-shadow duration-300">
        <CardContent className="p-4 flex flex-col items-center grow text-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-40 h-40 object-contain mb-3"
          />

          {/* Keep title/category block flexible */}
          <div className="flex flex-col grow justify-start">
            <h3 className="font-semibold line-clamp-2 min-h-12">{product.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 capitalize">
              {product.category}
            </p>
            <p className="font-bold text-lg mt-2">${product.price}</p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pb-4 mt-auto">
          <Button
            onClick={() => {
              dispatch(addToCart(product));
              toast.success(`${product.title.split(" ")[0]} added to cart 🛒`);
            }}
            className="w-32 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
