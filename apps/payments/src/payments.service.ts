import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PaymentStatus } from '.prisma/client/payments'
import { PaymentDto } from './payment.dto';
import { lastValueFrom } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    
    @Inject('PAYMENTS_SERVICE')
    private kafka: ClientKafka  
  ) { }

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
    await lastValueFrom(this.kafka.emit('payments', createdPayment));
    return createdPayment;
  }
}
