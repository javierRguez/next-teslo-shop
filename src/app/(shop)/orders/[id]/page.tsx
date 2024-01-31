import { Title } from "@/components";
import { OrderProductSummary } from "./ui/OrderProductSummary";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { notFound, redirect } from "next/navigation";
import { OrderItem } from "@/interfaces/order.interface";
import { OrderSummary } from "./ui/OrderSummary";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    //redirect("/");
    notFound();
  }

  const orderItems: OrderItem[] = order!.OrderItem;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <OrderProductSummary orderItems={orderItems} isPaid={order!.isPaid} />
          <OrderSummary order={order!} />
        </div>
      </div>
    </div>
  );
}
