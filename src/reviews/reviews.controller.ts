import { Controller, Get, Post, Body, Req, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/review.dto';

@ApiTags('Reviews & Ratings')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post(':productId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a review and rating for a product' })
  @ApiResponse({ status: 201, description: 'Review successfully submitted.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  addReview(
    @Req() req,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() data: CreateReviewDto,
  ) {
    return this.reviewsService.createReview(req.user.userId, productId, data.rating, data.comment);
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get all reviews for a product' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved successfully.' })
  getProductReviews(@Param('productId', ParseIntPipe) productId: number) {
    return this.reviewsService.getProductReviews(productId);
  }
}
