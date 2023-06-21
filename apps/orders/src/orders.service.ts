import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  all() {
    return this.prisma.order.findMany()
  }
}
