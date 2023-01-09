import { Provider } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export const services: Provider[] = [
  {
    provide: 'PRISMA_SERVICE',
    useFactory: () => {
      return new PrismaService();
    },
  },
];
