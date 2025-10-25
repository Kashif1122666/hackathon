import React from "react";
import { Button } from "../components/ui/button";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/features/cart/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center justify-between bg-card/70 backdrop-blur px-4 py-3 rounded-lg border border-border mb-3 gap-4">
      {/* Image + details */}
      <div className="flex items-center gap-3 min-w-[180px] flex-1">
        <img
          src={item.image}
          alt={item.title}
          className="w-14 h-14 object-contain rounded-md shrink-0"
        />
        <div className="flex flex-col justify-center">
          <p className="font-semibold line-clamp-2 leading-tight min-h-10">
            {item.title}
          </p>
          <p className="text-sm text-muted-foreground">${item.price}</p>
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-3 shrink-0">
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(decreaseQty(item.id))}
        >
          –
        </Button>
        <span className="min-w-5 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(increaseQty(item.id))}
        >
          +
        </Button>
      </div>

      {/* Remove button aligned consistently */}
      <div className="flex justify-end shrink-0">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => dispatch(removeFromCart(item.id))}
          className="whitespace-nowrap"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
