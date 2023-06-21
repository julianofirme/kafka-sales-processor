import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentDto } from './payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  all() {
    return this.paymentsService.all();
  }

  @MessagePattern('orders')
  async payment(@Payload() paymentPayload) {
    await this.paymentsService.payment({
      price: paymentPayload.price,
      orderId: paymentPayload.id,
      clientId: paymentPayload.clientId
    });
  }
}
