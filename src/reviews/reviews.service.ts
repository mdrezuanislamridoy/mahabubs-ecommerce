import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(userId: number, productId: number, rating: number, comment?: string) {
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    // Check if user already reviewed this product
    const existing = await this.prisma.review.findFirst({
      where: { userId, productId },
    });

    if (existing) {
      return this.prisma.review.update({
        where: { id: existing.id },
        data: { rating, comment },
      });
    }

    return this.prisma.review.create({
      data: { userId, productId, rating, comment },
    });
  }

  async getProductReviews(productId: number) {
    return this.prisma.review.findMany({
      where: { productId },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
