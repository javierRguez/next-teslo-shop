import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  // updateProductQuantity
  // removeProduct
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      addProductToCart: (product: CartProduct) => {
        const uniqueItemCondition = (item: CartProduct) => {
          return item.id === product.id && item.size === product.size;
        };

        const { cart } = get();
        //1. revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some((item) => uniqueItemCondition(item));

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Se que el producto existe por talla... tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (uniqueItemCondition(item)) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
      //skipHydration:true
    }
  )
);
