import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    PrismaModule
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
