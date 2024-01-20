"use client";

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const [loaded, setLoaded] = useState(false);
  const stateAddress = useAddressStore((state) => state.address);
  const {
    address,
    city,
    country,
    firstName,
    lastName,
    phone,
    postalCode,
    address2,
  } = stateAddress;

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {firstName} {lastName}
        </p>
        <p>{address}</p>
        <p>{address2}</p>
        <p>{postalCode}</p>
        <p>
          {city}, {country}
        </p>
        <p>{phone}</p>
      </div>
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className="text-2xl mt-5">Total:</span>
        <span className="text-2xl mt-5 text-right">
          {currencyFormat(total)}
        </span>
      </div>
      <div className="w-full mb-5 mt-5">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en &quot;Colocar orden&quot;, acepta nuestros{" "}
            <a href="#" className="underline">
              terminos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
          </span>
        </p>
        <button className="flex btn-primary justify-center">
          Colocar orden
        </button>
      </div>
    </div>
  );
};
