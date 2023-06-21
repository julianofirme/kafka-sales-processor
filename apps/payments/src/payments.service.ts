import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PaymentStatus } from '.prisma/client/payments'
import { PaymentDto } from './payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  all() {
    return this.prisma.payment.findMany()
  }

  async payment(data: PaymentDto) {
    const createdPayment = await this.prisma.payment.create({
      data: {
        ...data,
        status: PaymentStatus.APPROVED
      }
    })

    return createdPayment
  }
}
