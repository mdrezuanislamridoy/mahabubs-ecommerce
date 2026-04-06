import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PlaceOrderDto {
  @ApiProperty({ example: '123 Street, Dhaka', description: 'Shipping address for the order' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
