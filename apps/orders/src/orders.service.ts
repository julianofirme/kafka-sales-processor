import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { OrderDto } from './order.dto';
import { OrderStatus } from '.prisma/client/orders'

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  all() {
    return this.prisma.order.findMany()
  }

  async create(data: OrderDto) {
    const createdOrder = await this.prisma.order.create({
      data: {
        ...data,
        status: OrderStatus.PENDING
      }
    })

    return createdOrder
  }
}
