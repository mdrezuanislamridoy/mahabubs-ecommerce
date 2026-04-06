import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 1, description: 'ID of the product to add to cart' })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: 1, required: false, default: 1, description: 'Quantity of the product' })
  @IsNumber()
  @IsOptional()
  @Min(1)
  quantity?: number;
}
