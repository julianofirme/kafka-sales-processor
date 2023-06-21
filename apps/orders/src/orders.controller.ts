import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  all() {
    return this.ordersService.all();
  }

  @Post()
  create(@Body() data: OrderDto) {
    return this.ordersService.create(data);
  }
}
