import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Name of the category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Gadgets and devices', required: false, description: 'Description of the category' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
