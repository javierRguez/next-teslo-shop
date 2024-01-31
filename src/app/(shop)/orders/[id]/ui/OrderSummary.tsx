import { OrderPaidStatus, PayPalButton } from "@/components";
import { Order } from "@/interfaces";
import { currencyFormat } from "@/utils";

interface Props {
  order: Order;
}

export const OrderSummary = ({ order }: Props) => {
  const {
    address,
    city,
    countryId,
    firstName,
    lastName,
    phone,
    postalCode,
    address2,
  } = order.OrderAddress!;
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
          {city}, {countryId}
        </p>
        <p>{phone}</p>
      </div>
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {order.itemsInOrder === 1
            ? "1 artículo"
            : `${order.itemsInOrder} artículos`}
        </span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(order.subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(order.tax)}</span>
        <span className="text-2xl mt-5">Total:</span>
        <span className="text-2xl mt-5 text-right">
          {currencyFormat(order.total)}
        </span>
      </div>
      <div className="w-full mb-5 mt-5">
        {order.isPaid ? (
          <OrderPaidStatus isPaid={order.isPaid} />
        ) : (
          <PayPalButton amount={order!.total} orderId={order!.id} />
        )}
      </div>
    </div>
  );
};
