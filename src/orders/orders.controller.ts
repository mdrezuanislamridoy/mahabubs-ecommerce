import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PlaceOrderDto } from './dto/order.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Place an order' })
  @ApiResponse({ status: 201, description: 'Order successfully placed.' })
  @ApiResponse({ status: 400, description: 'Cart is empty.' })
  placeOrder(@Req() req, @Body() data: PlaceOrderDto) {
    return this.ordersService.placeOrder(req.user.userId, data.address);
  }

  @Get('history')
  @ApiOperation({ summary: 'View order history' })
  @ApiResponse({ status: 200, description: 'Order history retrieved successfully.' })
  getOrderHistory(@Req() req) {
    return this.ordersService.getOrderHistory(req.user.userId);
  }
}
