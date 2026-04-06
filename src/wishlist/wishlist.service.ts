import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlist(userId: number) {
    return this.prisma.wishlist.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  async addToWishlist(userId: number, productId: number) {
    const exists = await this.prisma.wishlist.findFirst({
      where: { userId, productId },
    });

    if (exists) {
      throw new ConflictException('Product already in wishlist');
    }

    return this.prisma.wishlist.create({
      data: { userId, productId },
    });
  }

  async removeFromWishlist(userId: number, productId: number) {
    const item = await this.prisma.wishlist.findFirst({
      where: { userId, productId },
    });

    if (!item) {
      throw new NotFoundException('Item not found in wishlist');
    }

    return this.prisma.wishlist.delete({
      where: { id: item.id },
    });
  }
}
