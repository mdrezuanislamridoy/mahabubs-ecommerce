"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const electronics = await prisma.category.upsert({
        where: { name: 'Electronics' },
        update: {},
        create: {
            name: 'Electronics',
            description: 'Gadgets and devices',
        },
    });
    const fashion = await prisma.category.upsert({
        where: { name: 'Fashion' },
        update: {},
        create: {
            name: 'Fashion',
            description: 'Clothing and accessories',
        },
    });
    await prisma.product.create({
        data: {
            name: 'Smartphone X',
            description: 'Latest flagship smartphone',
            price: 999.99,
            stock: 50,
            categoryId: electronics.id,
            imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        },
    });
    await prisma.product.create({
        data: {
            name: 'Wireless Earbuds',
            description: 'Premium noise-cancelling earbuds',
            price: 199.99,
            stock: 100,
            categoryId: electronics.id,
            imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
        },
    });
    await prisma.product.create({
        data: {
            name: 'Classic T-Shirt',
            description: '100% cotton comfortable t-shirt',
            price: 24.99,
            stock: 200,
            categoryId: fashion.id,
            imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        },
    });
    console.log('Seed data created successfully');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map