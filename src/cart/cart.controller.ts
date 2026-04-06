import { Controller, Get, Post, Delete, Body, Req, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AddToCartDto } from './dto/cart.dto';

@ApiTags('Shopping Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'View current user cart' })
  @ApiResponse({ status: 200, description: 'Cart items retrieved successfully.' })
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiResponse({ status: 201, description: 'Product added to cart.' })
  addToCart(@Req() req, @Body() data: AddToCartDto) {
    return this.cartService.addToCart(req.user.userId, data.productId, data.quantity);
  }

  @Delete('remove/:productId')
  @ApiOperation({ summary: 'Remove product from cart' })
  @ApiResponse({ status: 200, description: 'Product removed from cart.' })
  removeFromCart(@Req() req, @Param('productId', ParseIntPipe) productId: number) {
    return this.cartService.removeFromCart(req.user.userId, productId);
  }
}
