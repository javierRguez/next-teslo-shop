"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe seleccionar una talla*
        </span>
      )}
      {/* Selector de Tallas */}
      <SizeSelector
        onSizeChanged={setSize}
        selectedSize={size}
        avalibleSizes={product.sizes}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
