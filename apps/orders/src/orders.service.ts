import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { OrderDto } from './order.dto';
import { OrderStatus } from '.prisma/client/orders'
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    
    @Inject('ORDERS_SERVICE')
    private kafka: ClientKafka  
  ) { }

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

    await lastValueFrom(this.kafka.emit('orders', createdOrder))

    return createdOrder
  }

  complete(id: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
