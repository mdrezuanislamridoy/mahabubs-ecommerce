import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Smartphone X', description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Latest flagship smartphone', required: false, description: 'Description of the product' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 999.99, description: 'Price of the product' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 100, description: 'Stock quantity' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false, description: 'URL of the product image' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
