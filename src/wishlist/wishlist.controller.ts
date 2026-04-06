import { Controller, Get, Post, Delete, Body, Req, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Wishlist')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: 'View user wishlist' })
  @ApiResponse({ status: 200, description: 'Wishlist items retrieved successfully.' })
  getWishlist(@Req() req) {
    return this.wishlistService.getWishlist(req.user.userId);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add product to wishlist' })
  @ApiResponse({ status: 201, description: 'Product added to wishlist.' })
  addToWishlist(@Req() req, @Body() data: { productId: number }) {
    return this.wishlistService.addToWishlist(req.user.userId, data.productId);
  }

  @Delete('remove/:productId')
  @ApiOperation({ summary: 'Remove product from wishlist' })
  @ApiResponse({ status: 200, description: 'Product removed from wishlist.' })
  removeFromWishlist(@Req() req, @Param('productId', ParseIntPipe) productId: number) {
    return this.wishlistService.removeFromWishlist(req.user.userId, productId);
  }
}
