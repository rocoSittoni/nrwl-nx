import { OrderItem } from './order-item.model';
import { User } from '@nx-commerce/users';

export class Order {
    id?: string;
    orderItem?: OrderItem;
    shippingAdress1?: string;
    shippingAdress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: User;
    dateOrdered?: string;
}