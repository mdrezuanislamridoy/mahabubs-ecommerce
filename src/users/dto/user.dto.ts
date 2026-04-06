import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', required: false, description: 'Updated name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '123 New Street, Dhaka', required: false, description: 'Updated shipping address' })
  @IsString()
  @IsOptional()
  address?: string;
}
