import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  async addToCart(userId: number, productId: number, quantity: number = 1) {
    // Check if item already in cart
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: { userId, productId, quantity },
    });
  }

  async removeFromCart(userId: number, productId: number) {
    const item = await this.prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    if (!item) {
      throw new NotFoundException('Item not found in cart');
    }

    return this.prisma.cartItem.delete({
      where: { id: item.id },
    });
  }

  async clearCart(userId: number) {
    return this.prisma.cartItem.deleteMany({
      where: { userId },
    });
  }
}
