import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return { subTotal, tax, total, itemsInCart };
      },
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
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        if (quantity < 1) return;
        const { cart } = get();
        const uniqueItemCondition = (item: CartProduct) => {
          return item.id === product.id && item.size === product.size;
        };

        const updatedCartProducts = cart.map((item) => {
          if (uniqueItemCondition(item)) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        set({ cart: updatedCartProducts });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "shopping-cart",
      //skipHydration:true
    }
  )
);
