import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: { category: true },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, reviews: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findByCategory(categoryId: number) {
    return this.prisma.product.findMany({
      where: { categoryId },
      include: { category: true },
    });
  }

  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: { category: true },
    });
  }

  async create(data: any) {
    return this.prisma.product.create({
      data,
    });
  }

  async update(id: number, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
