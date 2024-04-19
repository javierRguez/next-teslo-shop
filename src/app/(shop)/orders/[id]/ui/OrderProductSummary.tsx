import { OrderPaidStatus, ProductImage } from "@/components";
import { OrderItem } from "@/interfaces";
import { currencyFormat } from "@/utils";

interface Props {
  orderItems: OrderItem[];
  isPaid: boolean;
}

export const OrderProductSummary = ({ orderItems, isPaid }: Props) => {
  return (
    <div className="flex flex-col mt-5">
      <OrderPaidStatus isPaid={isPaid} />

      {orderItems.map((item) => (
        <div key={`${item.product.slug}-${item.size}`} className="flex mb-5">
          <ProductImage
            src={item.product.ProductImage[0].url}
            width={100}
            height={100}
            alt={item.product.title}
            className="mr-5 rounded w-28 h-28"
          />
          <div>
            <p>{item.product.title}</p>
            <p>
              {currencyFormat(item.price)} x {item.quantity}
            </p>
            <p className="font-bold">
              Subtotal: {currencyFormat(item.price * item.quantity)}
            </p>
            <button className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </div>
  );
};
