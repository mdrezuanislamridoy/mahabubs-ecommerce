import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
  ) {}

  async placeOrder(userId: number, address: string) {
    const cartItems = await this.cartService.getCart(userId);

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    // Using transaction for order creation
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          address,
          orderItems: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
        include: { orderItems: true },
      });

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return order;
    });
  }

  async getOrderHistory(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
