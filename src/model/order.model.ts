
import { DeliveryMethod, PaymentMethod } from "../dto/requests/order.dto";
import { OrderStatus } from "./enum/order-status.enum";
import { UserModel } from "./user.model";

export type OrderModel = {
    id: string;
    user: UserModel;
    orderDate: Date;
    orderStatus: OrderStatus;
    paymentMethod: PaymentMethod;
    note: string;
    phoneNumber: string;
    buyerName: string;
    deliveryMethod: DeliveryMethod;
    originalAmount: number;
    discountedPrice: number;
    discountedAmount: number;
    deliveryAmount: number;
}